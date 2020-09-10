# Google-Calendar-Tool
Lo scopo di questo di tool è quello di permette ad un utente di visualizzare, con la possibilità di stampare in formato pdf, l'elenco dei propri calendari presenti sulla piattaforma Google Calendar e del monte ore degli stessi. 
Il tool è stato realizzato utilizzando le API di Google Calendar, reperibili al link: https://developers.google.com/calendar/v3/reference,
Si è reso necessario, al fine di poterle utilizzare, creare delle credenziali nella sezione "developer" offerta da Google Calendar.

# Requisiti
- *Python 2.4 o versioni successive (per fornire un server Web)*
- *Account Google con Google Calendar abilitato*
- *Account Google sviluppatore*


# Funzionamento 
- *Al primo avvio del tool viene richiesta l'autenticazione al proprio account google; 
cliccare il pulsante "Login", il quale aprirà una finestra pop-up per le opportune operazioni, ed  infine autorizzare l'applicazione. 
Effettuata l'autenticazione, l'utente può visualizzare tutti i calendari ad esso associato tramite apposito pulsante.
Selezionandone uno dall'elenco, viene visualizzata la lista degli eventi su esso registrati, la data di svolgimento e la durata degli stessi.
L'utente può, inoltre, inserire nuovi calendari e nuovi eventi. 
Infine, cliccando il pulsante "stampa", all'utente viene chiesto di selezionare il mese e il calendario di cui effettuare la rendicontazione, eventualmente salvandola in formato pdf.*

- *Il tool nasce dall'esigenza di effettuare la rendicontazione delle ore per progetto. 
A tal proposito, utilizzando Google Calendar, l'utente inserisce il proprio progetto come "calendario", a cui può attribuire un nome, e le ore svolte come "eventi", con un orario di inizio ed uno di fine.
Utilizzando il tool, potrà  effettuare queste operazione su un'unica piattaforma e,in seguito, effettuare la rendicontazione.*

# Installazione

- Clonare la repository o scaricare la repository.
- Creare un nuovo progetto Cloud Platform e abilitare automaticamente l'API di Google Calendar; successivamente creare una chiave API nello stesso progetto e prendere nota del "client ID" e della chiave generati. I dati creati andranno poi inseriti nel file "script.js".
- Avviare un qualsiasi server web.
- Per testare il tool è stato utilizzato il python SimpleHTTPServer:
 Eseguire "python -m SimpleHTTPServer 8000" (Python 2.x) oppure "python -m http.server 8000" (Python 3.x).
- Il tool è stato testato utilizzando Google Chrome.

# Author:
   - Sabrina Beninati
   - Email: sabry.beninati@gmail.com
   - LinkedIn: https://www.linkedin.com/in/sabrina-beninati-26108618b

