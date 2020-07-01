//function to validate email
export const validateEmail = (email) =>{
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
export const contentMarkup = (e) => {
    return {__html: e};
}
export const validateName = (name) =>{
    return name.match(/^[a-zA-Z" "\s]+$/)
}
let isPushEnabled = false;
let publicVapidkey = "BGviakRg_IjLNDz3Xkjtyul7XMxzF4BNn7nxSO0p5SpEo8WoU21US3SZOzG64IV3KE0oF3ZENfezrvWkMkAtnu0"
// function to convert the public key
const urlBase64ToUint8Array = (base64String) =>{
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
const endpointWorkaround = (pushSubscription) =>{
    // Make sure we only mess with GCM https://android.googleapis.com/gcm/send
    if (pushSubscription.endpoint.indexOf('https://fcm.googleapis.com/fcm/send/') !== 0) {
      return pushSubscription.endpoint;
    }
  
    var mergedEndpoint = pushSubscription.endpoint;
    // Chrome 42 + 43 will not have the subscriptionId attached
    // to the endpoint.
    if (pushSubscription.subscriptionId &&
      pushSubscription.endpoint.indexOf(pushSubscription.subscriptionId) === -1) {
      // Handle version 42 where you have separate subId and Endpoint
      mergedEndpoint = pushSubscription.endpoint + '/' +
        pushSubscription.subscriptionId;
    }
    return mergedEndpoint;
  }
const isEmpty = (obj) =>{
    for (const key in obj) {
        return false
    }
    return true
}
const sendSubscriptionToServer = async (subscription,path) =>{
    // console.log(subscription)
    let pushButton = document.querySelector('.js-push-button');
    // let path = "/"
    if(!navigator.onLine || isEmpty(subscription)){
        alert("Sorry you're offline")
        isPushEnabled = false
        pushButton.textContent = 'Enable Push Notification';
        pushButton.disabled = false;
        return
    }
    if(path){
        path = "/subscribe"
    }
    else{
        path = "/unsubscribe"
    }
    subscription = JSON.stringify(subscription)
    // console.log(subscription)
    try {
        await fetch(path,{
            method: 'POST',
            body: subscription,
            headers: {
                "content-type": "application/json"
            }
        })
    } catch (error) {
        console.log(error)
        
    }
    // subscription = endpointWorkaround(subscription)
}
const checkNotificationState = async () =>{
    let pushButton = document.querySelector('.js-push-button');
    // check if notification is supported
    if(!('showNotification' in ServiceWorkerRegistration.prototype)) return
    // check if a user has enabled notification in the browser
    if(Notification.permission === "denied") return
    // check if notification is granted
    if(Notification.permission === "default"){} 
    if(Notification.permission === "granted"){
        pushButton.textContent = 'Enable Push Messages';
    }
    // check if push messaging is supported
    if(!('PushManager' in window)) return
    // get the state of the notification
    const serviceWorkerObj = await navigator.serviceWorker.ready
    const subscription = await  serviceWorkerObj.pushManager.getSubscription()
    // if no subscribed yet
    if(!subscription) return 
    pushButton.textContent = 'Disable Push Messages';
    isPushEnabled = true;
    // else send to the server
    let subPath = true
    sendSubscriptionToServer(subscription,subPath)
}
const subscribe = async (applicationServerKey) =>{
    var pushButton = document.querySelector('.js-push-button');
    pushButton.disabled = true;
    applicationServerKey = urlBase64ToUint8Array(applicationServerKey)
    const serviceWorkerObj = await navigator.serviceWorker.ready
    const subscription = await serviceWorkerObj.pushManager.subscribe({userVisibleOnly:true,applicationServerKey})
    isPushEnabled = true;
    pushButton.textContent = 'Disable Push Messages';
    pushButton.disabled = false;
    let subPath = true
    return sendSubscriptionToServer(subscription,subPath)
}
const unsubscribe = async (applicationServerKey) =>{
    let pushButton = document.querySelector('.js-push-button');
    pushButton.disabled = true;
    applicationServerKey = urlBase64ToUint8Array(applicationServerKey)
    const serviceWorkerObj = await navigator.serviceWorker.ready
    const unsubscriberObj = await serviceWorkerObj.pushManager.getSubscription()
    const subscription = await unsubscriberObj.unsubscribe()
    console.log(subscription)
    isPushEnabled = false;
    pushButton.disabled = false;
    pushButton.textContent = 'Enable Push Messages';
    if(!subscription)return;
    let subPath = false
    return sendSubscriptionToServer(unsubscriberObj,subPath)
}
// window.addEventListener("load",e=>{
//     let pushButton = document.querySelector('.js-push-button');
//     let requestButton = document.querySelector(".js-request-button")
//     pushButton.addEventListener('click', () =>{
//         if (isPushEnabled) {
//             unsubscribe(publicVapidkey);
//         } else {
//             subscribe(publicVapidkey);
//         }
//     });
//     // request notification
//     if("serviceWorker" in navigator){
//         navigator.serviceWorker.register('./serviceWorker.js').then(checkNotificationState)
//     }
// })