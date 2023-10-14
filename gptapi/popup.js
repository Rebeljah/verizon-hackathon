document.addEventListener('DOMContentLoaded', function () {
    readTextWithElevenLabs("Hello, I am your personal assistant. How can I help you?");
    document.getElementById('sendButton').addEventListener('click', async function() {
        var inputField = document.getElementById('userInput');
        var question = inputField.value;
  
        console.log('User Question:', question);

        try {
            let answer = await getAnswerFromGPT3(question);
            console.log('Bot Answer:', answer);
            // Display the question and answer in the chatbox
            var chatbox = document.getElementById('chatbox');
            chatbox.innerHTML += "User: " + question + "<br>";
            chatbox.innerHTML += "Bot: " + answer + "<br>";
            await readTextWithElevenLabs(answer);
            // Clear the input field for the next question
            inputField.value = '';
        } 
        catch (error) {
            console.error('Error:', error);
        }
 
    }, false);
});

async function readTextWithElevenLabs(msg) {
    const url = "https://api.elevenlabs.io/v1/text-to-speech/ThT5KcBeYPX3keUQqHPh";

    // Randomly select API key
    let selectedKey = elevenKey;

    const headers = {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": selectedKey
    };

    const data = {
        "text": msg,
        "model_id": "eleven_monolingual_v1",
        "voice_settings": {
            "stability": 0.66,
            "similarity_boost": 0.72,
        }
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });
        const blob = await response.blob();
        const audio = new Audio(URL.createObjectURL(blob));
        audio.play();
    } catch (error) {
        console.error('Error:', error);
    }
}



  
  window.onload = function() {

    // Fetch question and answer from storage
    chrome.storage.sync.get('question', function(data) {
      var savedQuestion = data.question ? data.question : 'No questions saved';
      var chatbox = document.getElementById('chatbox');
      chatbox.innerHTML += "Saved Question: " + savedQuestion + "<br>";
    });
  
    chrome.storage.sync.get('answer', function(data) {
      var savedAnswer = data.answer ? data.answer : 'No answers saved';
      var chatbox = document.getElementById('chatbox');
      chatbox.innerHTML += "Saved Answer: " + savedAnswer + "<br>";
    });
  };