import openai
import os
import sys
import traceback
import inflect
inflect_engine = inflect.engine()
import string
import tiktoken
import requests
from dotenv import load_dotenv
load_dotenv()
from flask import Flask, request, jsonify, send_file
from flask_socketio import SocketIO, emit
#from ttsmms import TTS
from io import BytesIO
from gtts import gTTS
# from elevenlabs import generate, play, set_api_key, save
from tempfile import NamedTemporaryFile
import googleapiclient.discovery
import googleapiclient.errors

# requirements.txt
# openai, inflect, python-dotenv, flask, flask-socketio, ttsmms, asgiref, elevenlabs, gtts, tiktoken, google-api-python-client

openai.api_key = os.getenv("OPENAI_API_KEY")
# set_api_key(os.getenv("ELEVENLABS_API_KEY"))
youtube_api_key = os.getenv("YOUTUBE_API_KEY")
youtube_service = "youtube"
youtube_version = "v3"

API_MAX_ATTEMPTS = 3

dir_path = ".\data\eng"

#tts=TTS(dir_path) # or "model_dir_path" your path dir that extract a tar ball archive
tts=None

app = Flask(__name__)

# SocketIO

socketio = SocketIO(app, cors_allowed_origins='*')

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')


def num_tokens_from_string(string: str, encoding_name = "cl100k_base") -> int:
    encoding = tiktoken.get_encoding(encoding_name)
    num_tokens = len(encoding.encode(string))
    return num_tokens



def api_repeater(model_name, message_list, temp, maximum_tokens, max_attempts=API_MAX_ATTEMPTS):
    failed_attempts = 0
    while(failed_attempts < max_attempts):
        try:
            response = openai.ChatCompletion.create(
                model=model_name,
                messages=message_list,
                temperature= temp,
                max_tokens= maximum_tokens,
                stream= True
            )

            collected_chunks = []
            collected_messages = ""

            for chunk in response:
                collected_chunks.append(chunk)
                chunk_message = chunk['choices'][0]['delta']
                if "content" in chunk_message:
                    message_text = chunk_message["content"]
                    collected_messages += message_text
                    #print(f"{message_text}")

                    isNewReply = True if collected_chunks.index(chunk) == 0 else False
                    requests.post('http://18.237.102.230:3000/relay-message', json={'data': message_text, 'newReply': isNewReply})
            return collected_messages
                    
        except Exception as e:
            ex_type, ex_value, ex_traceback = sys.exc_info()
            trace_back = traceback.extract_tb(ex_traceback)
            stack_trace = list()

            for trace in trace_back:
                stack_trace.append("File : %s , Line : %d, Func.Name : %s, Message : %s" % (trace[0], trace[1], trace[2], trace[3]))

            print(f"Error #[{failed_attempts}] | Exception type : {ex_type.__name__} ")
            print("Exception message : %s" %ex_value)
            print("Stack trace : %s" %stack_trace)
        failed_attempts += 1

    return("An error occurred while getting a reply from the API.")

'''
Function: Fetch data from Youtube API
Parameters: API informatin and user prompt
Output: Youtube video URLs
'''
def youtube_api(api_service_name, api_version, youtube_api_key, user_prompt):
    youtube = googleapiclient.discovery.build(
        api_service_name, api_version, developerKey=youtube_api_key)


    youtube_request = youtube.search().list(
        part="snippet",
        maxResults=5,
        q=user_prompt,
        type="video"
    )

    response = youtube_request.execute()

    video_results = []

    for item in response['items']:
        # video_privacy_status = item['status']['privacyStatus']
        # if video_privacy_status == "public":
        video_title = item['snippet']['title']
        video_id = item['id']['videoId']
        channel_Title = item['snippet']['channelTitle']
        video_description = item['snippet']['description']
        video_url = f"https://youtube.com/watch?v={video_id}&ab_channel={channel_Title}"

        video_results.append({
            'video_title': video_title,
            'video_id': video_id,
            'channel_Title': channel_Title,
            'videoUrl': video_url,
            'videoDescription': video_description
        })

    return video_results


def video_preference(message):
    keywords = ["videos", "video", "recommendations", "Youtube"]
    return any(keyword in message for keyword in keywords)


def generate_query(message, prompt_format):


    prompt_format.append({"role": "system", "content": f"Create a maximum 3-5 words query for Youtube Search based on this '{message}'"})

    response = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo",
        messages=prompt_format,
        temperature=0.7,
        max_tokens=512
    )

    query = response.choices[0].message['content'].strip()
    print(f"===={query}")
    
    return query


@app.route('/get-chat-reply', methods=['POST'])
def get_chat_reply():
    message = request.json['message']
    user_tokens = num_tokens_from_string(message)
    system_message = request.json['sys_message']
    system_tokens = num_tokens_from_string(system_message)
    conversation_data = request.json["conv_data"]

    prompt_format = [{"role": "system", "content": "You are a helpful tutor"}]

    for msg in conversation_data:
        prompt_format.append({"role": "user", "content": msg["user_message"]})
        prompt_format.append({"role": "assistant", "content": msg["response_message"]})

    if(video_preference(message)):
        print("====VIDEO_PREFERENCE GPT RESPONSE")
        query = generate_query(message, prompt_format)
        video_results = youtube_api(youtube_service, youtube_version, youtube_api_key, query)
        prompt_format.append({"role": "system", "content": f"You are a tutor and You love providing video description and videoURL from this content: {video_results}"})
        prompt_format.append({"role": "user", "content": "Can you give me some video on it."})
        prompt_format.append({"role": "assistant", "content": f"Here are some videos I found on Youtube. Please note that some of the vidoe might not work based on publicity and region!"})
        prompt_format.append({"role": "assistant", "content":"Please note that some of the vidoe might not work based on publicity and region!"})

    if(system_message != ""):
        prompt_format.append({"role": "system", "content": system_message})
    prompt_format.append({"role": "user", "content": message})


    reply = api_repeater("gpt-3.5-turbo", prompt_format, 0.7, 512) 
    api_tokens = num_tokens_from_string(reply)

    print(f"Used Tokens: {user_tokens + system_tokens + api_tokens} | User used {user_tokens} tokens, System used {system_tokens} tokens, API used {api_tokens} tokens")
    return jsonify({'reply': reply})

# @app.route('/get-chat-reply-audio', methods=['POST'])
# async def get_chat_reply_audio():
#     data = request.json
#     userMessage = data['message']
#     ai_type = data['ai_type']

#     bad_TTS = True 
#     if(ai_type == "11aiTTS"):
#         bad_TTS = False

#     wav_io = None

#     if(bad_TTS):
#         # Process the user message
#         translator = str.maketrans('', '', string.punctuation)

#         userMessage = userMessage.translate(translator)

#         stringedMessages = userMessage.split()
#         msgLength = len(stringedMessages)
#         for i in range(msgLength):
#             if(stringedMessages[i].isdigit()):
#                 replacement = inflect_engine.number_to_words(stringedMessages[i])
#                 stringedMessages[i] = replacement

#         userMessage = " ".join(stringedMessages)

#         temp_wav = NamedTemporaryFile(delete=True)
#         temp_wav.close()
#         tts.synthesis(userMessage, wav_path=temp_wav.name)
#         with open(temp_wav.name, 'rb') as f:
#             wav_data = f.read()
#         wav_io = BytesIO(wav_data)
#         # Make sure to delete the temporary file after you are done with it
#         os.unlink(temp_wav.name)
#     else:
#         audio = generate(
#             text=userMessage,
#             voice="Josh",
#             model="eleven_monolingual_v1"
#         )
#         wav_io = BytesIO(audio)

#     return send_file(wav_io, mimetype='audio/wav')


@app.route('/get-chat-reply-audio-free', methods=['POST'])
async def get_chat_reply_audio_free():
    data = request.json
    userMessage = data['message']
    google_tts = gTTS(userMessage, lang='en')  # create gTTS object
    google_tts.speed = 0.9
    mp3_io = BytesIO()
    google_tts.write_to_fp(mp3_io)
    mp3_io.seek(0)

    return send_file(mp3_io, mimetype="audio/mpeg")


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)  # Flask server is running on port 5000