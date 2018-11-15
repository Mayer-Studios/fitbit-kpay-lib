/*
* K·Pay Integration Library - v1.2.10 - Copyright Kiezel 2018
* Last Modified: 2018-10-31
*
* BECAUSE THE LIBRARY IS LICENSED FREE OF CHARGE, THERE IS NO 
* WARRANTY FOR THE LIBRARY, TO THE EXTENT PERMITTED BY APPLICABLE 
* LAW. EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT 
* HOLDERS AND/OR OTHER PARTIES PROVIDE THE LIBRARY "AS IS" 
* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, 
* INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF 
* MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE ENTIRE
* RISK AS TO THE QUALITY AND PERFORMANCE OF THE LIBRARY IS WITH YOU.
* SHOULD THE LIBRARY PROVE DEFECTIVE, YOU ASSUME THE COST OF ALL 
* NECESSARY SERVICING, REPAIR OR CORRECTION.
* 
* IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN 
* WRITING WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MAY 
* MODIFY AND/OR REDISTRIBUTE THE LIBRARY AS PERMITTED ABOVE, BE 
* LIABLE TO YOU FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL, 
* INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR 
* INABILITY TO USE THE LIBRARY (INCLUDING BUT NOT LIMITED TO LOSS
* OF DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY 
* YOU OR THIRD PARTIES OR A FAILURE OF THE LIBRARY TO OPERATE WITH
* ANY OTHER SOFTWARE), EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN 
* ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
*/
import { locale } from "user-settings";
import document from "document";

//console.log(locale.language);
checkLang()
let message;
let inPurchase;
let popUp;
let alreadyPaid;
let alreadyPaidButton;
/**
  When set to true, you can test the purchasing of your app without having to pay for real.
  When set to true, trial times will always be 30 seconds (only when time trial is enabled here and on the server)
  
  Test purchases only, set to false before releasing or users can get your app for free!
*/
export var KPAY_TEST_MODE = true;

/**
  Default messages shown to the user in different stages of the purchase.
  Only used when the messages are handled by KPay and not overridden by your app
  
  You can change the messages to your liking here. Make sure to check if the changed message still fits the display.

  It is also possible to configure a custom url in your product settings on our website so its shows your personalized purchase page to the customers.
*/
//export var KPAY_CODE_AVAILABLE_MSG = "To continue using K·pay test product please visit kzl.io/code and enter this code:";
//export var KPAY_PURCHASE_STARTED_MSG = "Please complete the purchase process on kzl.io/code to unlock K·pay test product";

/**
  Configure wether you want the "paid app" popup to be displayed to the user after installing this app.
  This will be required by Fitbit for new paid apps and updates of paid apps after August 1st 2018
  
  You can change the text here. 
  
  If the text does not decently fit the screen anymore after big changes to the length, you also have to 
  modify it in the kpay.gui file so it uses the correct font size and fits decently. 
  
  Small changes can be done here only.
*/
export var KPAY_SHOW_PAID_APP_POPUP = true;
//export var KPAY_PAID_APP_POPUP_TEXT = "This is a paid app. After a 1 hour free trial, it requires a one-time payment of $1.00 to keep using it.";


function checkLang() {
  var user_language;
  user_language = user_language || locale.language
  
  console.log(user_language.slice(0, 2))
  var lang = user_language.slice(0, 2)
  console.log(lang)
  switch(lang) {
    case "en":
      message = "To continue using K·pay test product please visit kzl.io/code and enter this code: ";
      inPurchase = "Please complete the purchase process on kzl.io/code to unlock K·pay test product ";
      popUp = "This is a paid app. After a 1 hour free trial, it requires a one-time payment of $1.00 to keep using it. "; 
      alreadyPaid = "When the app asks for payment again, use the 'Already purchased' button at the bottom of purchase page to unlock for free."
      alreadyPaidButton = "Already Paid"
      break;
    case 'de':
      message = "Um das K · pay-Testprodukt weiterhin zu verwenden, besuchen Sie kzl.io/code und geben Sie diesen Code ein: ";
      inPurchase = "Bitte schließen Sie den Kaufvorgang auf kzl.io/code ab, um das K · pay-Testprodukt freizuschalten";
      popUp = "Dies ist eine kostenpflichtige App. Nach einer 1-stündigen kostenlosen Testversion ist eine einmalige Zahlung von 1,00 US-Dollar erforderlich, um sie weiterhin verwenden zu können."
      alreadyPaid = "Wenn die App erneut zur Zahlung auffordert, können Sie sie über die Schaltfläche Bereits gekauft am unteren Rand der Kaufseite kostenlos entsperren."
      alreadyPaidButton = "Bereits bezahlt"
      console.log("German")
    case 'fr':
      inPurchase = "Veuillez compléter le processus d'achat sur kzl.io/code pour déverrouiller le produit de test K · pay";
      message = "Pour continuer à utiliser le produit de test K · pay, visitez le site kzl.io/code et entrez le code suivant: ";
      popUp = "Ceci est une application payante. Après une heure d'essai gratuite, un paiement unique de 1,00 USD est nécessaire pour continuer à l'utiliser.";
      alreadyPaid = "Lorsque l'application demande à nouveau de payer, utilisez le bouton Déjà acheté en bas de la page d'achat pour le déverrouiller gratuitement."
      alreadyPaidButton = "Déjà payé"
     break;
    case 'es':
      message = "Para continuar usando el producto de prueba K · pay, visite kzl.io/code e ingrese este código:";
      inPurchase = "Complete el proceso de compra en kzl.io/code para desbloquear el producto de prueba K · pay";
      popUp = "Esta es una aplicación de pago. Después de una prueba gratuita de 1 hora, se requiere un pago único de $ 1.00 para seguir usándolo.";
      alreadyPaid = "Cuando la aplicación solicite el pago nuevamente, use el botón Ya comprado en la parte inferior de la página de compra para desbloquear de forma gratuita."
      alreadyPaidButton = "Ya Pagado"
      break;
    case 'it':
      message = "Per continuare a utilizzare il prodotto K · pay test, visitare kzl.io/code e inserire questo codice: ";
      inPurchase = "Si prega di completare il processo di acquisto su kzl.io/code per sbloccare il prodotto di prova di pagamento K · Pay ";
      popUp = "Questa è un'app a pagamento. Dopo 1 ora di prova gratuita, è necessario un pagamento una tantum di $ 1,00 per continuare a utilizzarlo.";
      alreadyPaid = "Quando l'app richiede nuovamente il pagamento, utilizza il pulsante Già acquistato nella parte inferiore della pagina di acquisto per sbloccarlo gratuitamente."
      alreadyPaidButton = "Già pagato"
      break;
    case 'ja':
      message = "K・ペイテスト製品を引き続き使用するには、kzl.io/codeにアクセスして以下のコードを入力してください：";
      inPurchase = "K・ペイテスト製品のロックを解除するには、kzl.io/codeの購入手続きを完了してください";
      popUp = "これは有料アプリです。 1時間の無料試用期間を経た後も、それを使用し続けるには1回限りの$ 1.00の支払いが必要です。"
      alreadyPaid = "アプリがもう一度支払いを要求すると、購入ページの下部にある[購入済]ボタンを使用して無料でロックを解除します。"
      alreadyPaidButton = "既に支払いました"     
      break;
    default:
      message = "To continue using K·pay test product please visit kzl.io/code and enter this code: ";
      inPurchase = "Please complete the purchase process on kzl.io/code to unlock K·pay test product ";
      popUp = "This is a paid app. After a 1 hour free trial, it requires a one-time payment of $1.00 to keep using it."; 
        alreadyPaid = "When the app asks for payment again, use the 'Already purchased' button at the bottom of purchase page to unlock for free."
      alreadyPaidButton = "Already Paid"
    break;
  }
}

export var KPAY_CODE_AVAILABLE_MSG = message
export var KPAY_PURCHASE_STARTED_MSG = inPurchase
export var KPAY_PAID_APP_POPUP_TEXT = popUp
export var KPAY_ALREADYPAID_POPUP_TEXT = alreadyPaid
export var KPAY_ALREADYPAID_BUTTON = alreadyPaidButton