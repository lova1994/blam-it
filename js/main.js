// import { requestNotificationPermission, createNotification } from './notifications.js';
// import push from './push-notifications.js';

const downloadButton = document.getElementById('btn-download');




function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('../sw.js')
        .then(() => console.log('Registered service worker'))
        .catch((error) => console.log('Error register service worker ', error));
    }
}

registerServiceWorker(); 

// Denna funktion använder kameran och lägger in det i elementet #me
async function getMedia() {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true});
      const videoElem = document.querySelector('#me');
      videoElem.srcObject = stream;
      videoElem.addEventListener('loadedmetadata', () => {
        videoElem.play();
      })
      console.log(stream);
    } catch (error) {
        console.log(error);
    }
  }




// SKA fixa funktion så att man kan ta en ny bild efter lagt
  
  // let element = document.getElementById(photo);
  // if (element) {
  //   console.log(832543298492)

  //   function removeElement(photo) {
  //       // Removes an element from the document
  //       var element = document.getElementById(photo);
  //       element.parentNode.removeChild(element);
  //   } }





  // Tar kort




async function captureImage(stream) {

  // if (document.querySelector('canvas') !== null) {
  //   document.querySelector('#photo').removeAttribute('data-caman-id');
  //   const switch_img = imgUrl
  //   renderCanvas('#photo', switch_img);
  // }


    const mediaTrack = stream.getVideoTracks()[0];
    console.log("TAR KORT NU")
    console.log(mediaTrack);
    const captureImg = new ImageCapture(mediaTrack);
    const photo = await captureImg.takePhoto()
    console.log(photo)
    const imgUrl = URL.createObjectURL(photo);
    console.log("Bildurl" + imgUrl);
    document.querySelector('#photo').src = imgUrl;
  }

  document.querySelector('#addImage').addEventListener('click', event => {
    //document.querySelector('.shakespeare').classList.toggle('hide');
    captureImage(stream);
})


// Testar filter
function greyScale() {
    Caman("#photo", function () {
      this.revert()
        this.greyscale().render();
        console.log(this.greyscale())
      });
    }

    // Ta bort filter 
    function removeFilter() {
      Caman("#photo", function () {
        this.revert()
      });
    }
    

  //   function gamma() {
  //     Caman("#photo", function () {
  //   this.gamma(1.5).render();
  // });
  //   }

    function gamma() {
      Caman("#photo", function () {
        this.revert()
        this.gamma(1.5).render();
        });
      }
  

      function brightMe() {
      
        Caman("#photo", function () {
          this.brightness(10);
          this.contrast(20);
          this.render();
        });

      }

function filterMe() {
  Caman('#photo', function (){
    this.brightness(10);
    this.contrast(30);
    this.sepia(60);
    this.saturation(-30);
    this.render();
  });
}
    

// gör en reset och kör den innan nytt filter :)


// function gamma() {
//     if (value == 0) {
//         this.revert();
//       }
//       console.log(value - oldValue);
//       //Applicera differensen av förgående värde och nuvarande värde
//       this.gamma(value - oldValue);
//       //Spara undan nuvarande värde 
//       oldValue = value;
//       this.render();
//     // här ska reset köras
// Caman("#photo", function () {
//     this.gamma(1.5).render();
//   });
// }



// kollar om offline: här ska  knappen disablas 
if (!navigator.onLine) {
  console.log("Du är offline")
  
}

if (navigator.onLine) {
  console.log("Du är online")


downloadButton.addEventListener('click', () => {
    let canvas = document.getElementById("photo");
    let dataURL = canvas.toDataURL('image/png');
    downloadButton.href = dataURL;
});
}


  // getMedia();