const url = '/api/v1/uploadImage'
const fileFormDOM = document.querySelector('.file-form')
const imageInputDOM = document.querySelector('#image')
const dropArea = document.getElementById('drop-area')
const imagePreview = document.getElementById('image-preview')
const containerDOM = document.querySelector('.myContainer')
let imageValue

// fetch Api
$.ajax({
  url: 'http://numbersapi.com/1/30/date?json',
  type: 'GET',
  success: function (data) {
    $('p#number-fact').each(function () {
      $(this).text(data.text)
    })
  },
})

// Drag and drop event listeners
dropArea.addEventListener('dragover', (event) => {
  event.preventDefault()
  dropArea.classList.add('dragging')
})

dropArea.addEventListener('dragleave', () => {
  dropArea.classList.remove('dragging')
})

dropArea.addEventListener('drop', (event) => {
  event.preventDefault()
  dropArea.classList.remove('dragging')

  const files = event.dataTransfer.files
  handleFiles(files)
})

dropArea.addEventListener('click', () => {
  imageInputDOM.click()
})

imageInputDOM.addEventListener('change', (event) => {
  const files = event.target.files
  handleFiles(files)
})

function handleFiles(files) {
  const imageFile = files[0]
  if (imageFile) {
    const reader = new FileReader()
    reader.onload = function (event) {
      imagePreview.src = event.target.result
      imagePreview.style.display = 'block'
    }
    reader.readAsDataURL(imageFile)
    imageValue = imageFile
  }
}

// upload file
fileFormDOM.addEventListener('submit', async (e) => {
  e.preventDefault()

  if (imageValue) {
    const formData = new FormData()
    formData.append('image', imageValue)

    try {
      const {
        data: {
          image: { src },
        },
      } = await axios.post(`/api/v1/uploadImage/uploads`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      imageValue = src
      alert('Image uploaded successfully')
      //? console.log('Image uploaded successfully:', src)
    } catch (error) {
      imageValue = null
      console.error('Error uploading image:', error)
    }
  }

  try {
    const product = { image: imageValue }
    await axios.post(url, product)
    fetchProducts()

    imageInputDOM.value = ''
    imagePreview.style.display = 'none'
    imagePreview.src = ''
    imageValue = null
    console.log('Form reset successfully') / (await fetchImages())
  } catch (error) {
    console.error('Error submitting form:', error)
  }
})

// Fetch images function
async function fetchImages() {
  try {
    // const { data: images } = await axios.get('/upload_images/list')
    const { data: images } = await axios.get(
      '/api/v1/uploadImage/upload_images/list'
    )

    const imagesDOM = images
      .map((image) => {
        return `<article class="image-item">
                  <img src="/upload_images/${image.filename}" alt="${image.filename}" class="img"/>
                </article>`
      })
      .join('')

    containerDOM.innerHTML = imagesDOM
  } catch (error) {
    console.log(error)
  }
}

// Initial fetch of images
fetchImages()
