window.fbAsyncInit = function() {
  FB.init({
    appId      : '357909948003609', /* Pegar aqui el número de identificador de facebook*/
    xfbml      : true,
    version    : 'v2.9'
  });
  FB.AppEvents.logPageView();
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));


function shareScore(score) {
  
  FB.ui({
    method: 'feed', /* method: 'feed'  solo en el muro */
    link: 'http://video.twicky.com.mx/Shoot/',
    quote: 'Mi puntuación: ' + score,
    picture: 'https://s3.envato.com/files/204256457/03_preview.jpg'
  });

}
