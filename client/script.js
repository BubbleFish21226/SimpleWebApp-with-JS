import bot from './assets/bot.svg'
import user from './assets/user.svg'

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container')
console.log (form)
console.log(chatContainer)

let loadInterval;

function loader(element) {
  element.textContent = '';
  loadInterval = setInterval(()=>{
    element.textContent +='.';
    if (element.textContent == '....') {
      element.textContent = ''
    }
  }, 300)
}

function typeText(element, text) {
  let index = 0;

  let interval = setInterval(()=>{
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++
    }
    else
    {
      clearInterval(interval)
    }
  }, 20)
}

function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexString = randomNumber.toString(16);
  return `id-${timestamp}-${hexString}`;
}

function chatStripe(isAi,value, uniqueID) {
  return (
    `<div class="wrapper ${isAi && "ai"}">
        <div class="chat">
          <div class="profile">
            <img
              src = "${isAi?"bot":"user"}"
              />
          </div>
          <div class="message", id=${uniqueID}> ${value}</div>
        </div>
      </div>`
  )
}

const handleSubmit = async (e) =>
{
  e.preventDefault();
  const data = new FormData (form)
  const chatID = generateUniqueId()
  chatContainer.innerHTML += chatStripe(true,"",chatID)
  chatContainer.scrollTop = chatContainer.scrollHeight
  form.reset()
  const messageDiv = document.getElementById(chatID)
  typeText(messageDiv, data.get ('prompt'))
  // const id = generateUniqueId()
  // chatContainer.innerHTML += chatStripe(false," ", id );
  // form.reset();

  // const messageDiv = document.getElementById(id)
  // loader(messageDiv)

  const response = await fetch('http://localhost:5000', {
    method : 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: data.get('prompt')
    })
  })
  
  const responseData = await response.json();

  console.log (responseData.answer)
}

form.addEventListener('submit', handleSubmit)
form.addEventListener('keyup', (e)=>{
  if (e.keyCode === 13) {
    handleSubmit(e)
  }
})

