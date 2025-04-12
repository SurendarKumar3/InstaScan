// Form Submission and Loader Handling
document.getElementById('uploadForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    
    // Show loader
    const loader = document.getElementById('loader');
    const scanButton = this.querySelector('button[type="submit"]');
    
    scanButton.classList.add('hidden');
    loader.classList.remove('hidden');
  
    const selectedCategory = document.getElementById('selectedCategory').value;
    if (!selectedCategory) {
      alert('Please select a product category before scanning');
      loader.classList.add('hidden');
      scanButton.classList.remove('hidden');
      return;
    }
  
    const formData = new FormData(this);
    const imageInput = document.getElementById('imageInput');
    const imageUrl = document.getElementById('imageUrl').value;
  
    try {
      // Handle image preview
      if (imageInput.files[0]) {
        const dataUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(imageInput.files[0]);
        });
        sessionStorage.setItem('uploadedImage', dataUrl);
      } else if (imageUrl) {
        sessionStorage.setItem('uploadedImage', imageUrl);
      } else {
        alert('Please upload an image or enter an image URL');
        loader.classList.add('hidden');
        scanButton.classList.remove('hidden');
        return;
      }
  
      // Add category to form data
      formData.append('selectedCategory', selectedCategory);

      // Send request to backend
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      sessionStorage.setItem('scanResult', JSON.stringify(result));
      window.location.href = `${selectedCategory}.html`;
  
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('result').textContent = 'Error: ' + error.message;
      loader.classList.add('hidden');
      scanButton.classList.remove('hidden');
    }
  });
  
  // Camera Functions
  let cameraStream = null;
  
  async function openCamera() {
    try {
      cameraStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false
      });
      
      const cameraModal = document.getElementById('cameraModal');
      const cameraPreview = document.getElementById('cameraPreview');
      
      cameraPreview.srcObject = cameraStream;
      cameraModal.classList.remove('hidden');
      
      // Lock screen orientation
      screen.orientation.lock('landscape').catch(() => {});
    } catch (error) {
      alert('Error accessing camera: ' + error.message);
    }
  }
  
  function closeCamera() {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      cameraStream = null;
    }
    document.getElementById('cameraModal').classList.add('hidden');
    screen.orientation.unlock();
  }
  
  function capturePhoto() {
    const cameraPreview = document.getElementById('cameraPreview');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    // Set canvas dimensions to match video stream
    canvas.width = cameraPreview.videoWidth;
    canvas.height = cameraPreview.videoHeight;
  
    // Draw current video frame to canvas
    ctx.drawImage(cameraPreview, 0, 0, canvas.width, canvas.height);
  
    // Convert canvas to File object
    canvas.toBlob((blob) => {
      const file = new File([blob], 'captured-photo.jpg', {
        type: 'image/jpeg',
        lastModified: Date.now()
      });
  
      // Update file input
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      document.getElementById('imageInput').files = dataTransfer.files;
  
      closeCamera();
    }, 'image/jpeg', 0.9);
  }
  
  // Category Selection Function
  function selectCategory(category) {
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.classList.remove('bg-blue-600', 'text-white', 'border-transparent');
      btn.classList.add('border-blue-600', 'text-blue-600');
    });
    const activeBtn = event.target;
    activeBtn.classList.add('bg-blue-600', 'text-white', 'border-transparent');
    activeBtn.classList.remove('border-blue-600', 'text-blue-600');
    document.getElementById('selectedCategory').value = category;
  }