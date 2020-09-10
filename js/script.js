// Client ID and API key from the Developer Console
var CLIENT_ID = '<YOUR_CLIENT_ID>';
var API_KEY = '<YOUR_API_KEY>';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar";
var SCOPES = "https://www.googleapis.com/auth/calendar.events"

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function() {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, function(error) {
        appendPre(JSON.stringify(error, null, 2));
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        $("#authorize_button").css("display", "none");
        $("#signout_button").css("display", "block");

    } else {
        $("#authorize_button").css("display", "block");
        $("#signout_button").css("display", "none");
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}


$(document).ready(function() {
    handleClientLoad();

});

//return existing projects
function getProjects() {
    gapi.client.load('calendar', 'v3', function() {
        var request = gapi.client.calendar.calendarList.list({});

        request.execute(function(resp) {
            $("#projects").html("");
            for (var i = 0; i < resp.items.length; i++) {

                $("#projects").append(
                    $("<div>").addClass("row").append(
                        $("<div>")
                        .addClass("col-12")
                        .text(resp.items[i].summary)
                        .attr("calendar-id", resp.items[i].id).on("click", function() {
                            getCalendarsList($(this).attr("calendar-id"))

                        })
                    )
                );
            }
        });
    });
    show_projects();
}


//return  events from a project 


function getCalendarsList(id) {

    gapi.client.load('calendar', 'v3', function() {
        var request = gapi.client.calendar.events.list({
            'calendarId': id,
        });

        request.execute(function(resp) {
            $("#events").html("");

            for (var i = 0; i < resp.items.length; i++) {

                var start = new Date(resp.items[i].start.dateTime);
                var end = new Date(resp.items[i].end.dateTime);
                let sumMillies = (end - start);
                var summary = resp.items[i].summary;

                $("#events").append(

                    $("<div>").addClass("row").append(
                        $("<div>").addClass("col-3").text(summary)
                    ).append(
                        $("<div>").addClass("col-3").text(formatDate(start))
                    ).append(
                        $("<div>").addClass("col-3").text(formatDate(end))
                    ).append(
                        $("<div>").addClass("col-3").text(sumMillies / 1000 / 60 / 60)
                    )


                );
            }
        });
    });
    show_events();
}

function formatDate(data) {
    let year = data.getFullYear();
    let month = data.getMonth() + 1;
    let day = data.getDate()

    return day + "/" + month + "/" + year;
};



//delete an existing project

function deleteProject() {

    gapi.client.load('calendar', 'v3', function() {
        var request = gapi.client.calendar.calendarList.list({});
        $(".main").prepend("<p> Seleziona l'attività da eliminare.<hr></p>");

        request.execute(function(resp) {
            $("#projects").html("");
            for (var i = 0; i < resp.items.length; i++) {


                $("#projects").append(
                    $("<div>").addClass("row").append(
                        $("<div>")
                        .addClass("col-12")
                        .text(resp.items[i].summary)
                        .attr("calendar-id", resp.items[i].id).on("click", function() {
                            var r = confirm("Conferma eliminazione");
                            if (r == true) {
                                _deleteProject($(this).attr("calendar-id"));
                            } else {
                                $("<div").append("cancel")
                            }
                        })
                    )
                );

            }
        });
    });
    show_projects();
}


function _deleteProject(id) {
    return gapi.client.calendar.calendars.delete({
        'calendarId': id
    }).then(function(response) {
            // Handle the results here (response.result has the parsed body).
            alert("Attività rimossa!");
            window.location.reload();
        },
        function(err) { console.error("Execute error", err); });

}

function myPrint() {
    $(".not-printable").css("display", "none");
    window.print();
    $(".not-printable").css("display", "block");
};

function show_new_project() {
    $("#new_project").css("display", "block");
    $("#projects").css("display", "none");
    $("#events").css("display", "none");
    $("#new_event").css("display", "none");
    $("#mese").css("display", "none");
};

function show_projects() {
    $("#new_project").css("display", "none");
    $("#projects").css("display", "block");
    $("#events").css("display", "none");
    $("#new_event").css("display", "none");
    $("#mese").css("display", "none");
};

function show_events() {
    $("#new_project").css("display", "none");
    $("#projects").css("display", "none");
    $("#events").css("display", "block");
    $("#new_event").css("display", "none");
    $("#mese").css("display", "none");
};


function show_new_event() {
    $("#new_project").css("display", "none");
    $("#projects").css("display", "none");
    $("#events").css("display", "none");
    $("#new_event").css("display", "block");
    $("#mese").css("display", "none");
};

function show_month() {
    $("#new_project").css("display", "none");
    $("#projects").css("display", "none");
    $("#events").css("display", "none");
    $("#new_event").css("display", "none");
    $("#mese").css("display", "block");
    getPr();
};


//inserisce un nuovo progetto

function insertProject() {
    return gapi.client.calendar.calendars.insert({
            "resource": {
                "summary": document.getElementById("summary").value
            }
        })
        .then(function(response) {
                show_new_project();
            },
            function(err) { console.error("Execute error", err); });
};



//insert new event 

function getId() {

    gapi.client.load('calendar', 'v3', function() {
        var request = gapi.client.calendar.calendarList.list({});

        $(".main").prepend("<p> Seleziona l'attività a cui aggiungere un evento.<hr></p>");

        request.execute(function(resp) {
            $("#projects").html("");

            for (var i = 0; i < resp.items.length; i++) {

                $("#projects").append(
                    $("<div>").addClass("row").append(
                        $("<div>")
                        .addClass("col-12")
                        .text(resp.items[i].summary)
                        .attr("calendar-id", resp.items[i].id).on("click", function() {
                            show_form($(this).attr("calendar-id"));
                        })
                    )
                );

            }
        });
    });
    show_projects();
}

function show_form(calendarId) {
    show_new_event();
    document.getElementById("id_progetto").value = calendarId;
    ''
};


function insertEvent() {
    var event = {
        'summary': document.getElementById("nome_evento").value,
        'location': 'Viale Andrea Doria 6, Catania',
        'description': '',
        'start': {
            'dateTime': document.getElementById("start").value + ':00+02:00',
            'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        'end': {
            'dateTime': document.getElementById("end").value + ':00+02:00',
            'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        'recurrence': [

        ],
        'attendees': [],
        'reminders': {
            'useDefault': false,
            'overrides': []
        }
    };


    var request = gapi.client.calendar.events.insert({
        'calendarId': document.getElementById("id_progetto").value,
        'resource': event
    });

    request.execute(function(event) {
        $("#new_event").append('Event created: ' + event.htmlLink);
    });
};



//rendicontazione

function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
    //return new Date(year, month + 1, 0).getDate();

};


async function createTable() {
    var mese = new Date(document.getElementById("mese_anno").value).getMonth() + 1;
    var anno = new Date(document.getElementById("mese_anno").value).getFullYear();
    var idProg = document.getElementById("progSel").value;
    var giorni = getDaysInMonth(mese, anno);

    var mese_;
    switch (mese) {
        case 1:
            mese_ = "Gennaio";
            break;
        case 2:
            mese_ = "Febbraio";
            break;
        case 3:
            mese_ = "Marzo";
            break;
        case 4:
            mese_ = "Aprile";
            break;
        case 5:
            mese_ = "Maggio";
            break;
        case 6:
            day = "Giugno";
        case 7:
            mese_ = "Luglio";
            break;
        case 8:
            mese_ = "Agosto";
            break;
        case 9:
            mese_ = "Settembre";
            break;
        case 10:
            mese_ = "Ottobre";
            break;
        case 11:
            mese_ = "Novembre";
            break;
        case 12:
            mese_ = "Dicembre";
            break;

    }



    var table = '<table style="width:100%">\
    <tr>\
        <td class="colors" rowspan="2" >Descrizione Attività</td>\
        <td class="colors"  style="text-align: center;" colspan= "' + giorni + '" > ' + mese_ + ' </td>\
        <td  class="colors" rowspan="2" >Totale ore</td>\
    </tr>\
    <tr>';
    for (var i = 1; i <= giorni; i++) {
        table += '<td>' + i + '</td>';
    }
    table += '</tr>';

    //console.log(document.getElementById("progSel").value)
    var ore = new Array(giorni).fill(0);
    gapi.client.load('calendar', 'v3');

    var request = await gapi.client.calendar.calendarList.list({});
    const resp = JSON.parse(request.body);

    var progtot = new Array(giorni).fill(0);


    for (var i = 0; i < resp.items.length; i++) {

        if (resp.items[i].id == idProg) {
            table += '<tr> <td>' + (resp.items[i].summary) + '</td>';
            var oreProgetto = new Array(giorni).fill(0);
            // var idProgetto = (resp.items[i].id)
            var request1 = await gapi.client.calendar.events.list({
                'calendarId': idProg,
                'timeMax': anno + '-' + mese + '-' + giorni + 'T23:59:59-02:00',
                'timeMin': anno + '-' + mese + '-01T00:00:00-02:00',
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            });
            const eventiMese = JSON.parse(request1.body);
            for (var j = 0; j < eventiMese.items.length; j++) {
                var start = new Date(eventiMese.items[j].start.dateTime);
                var end = new Date(eventiMese.items[j].end.dateTime);
                var sunmillis = (end - start) / 1000 / 60 / 60;
                var giornoProgetto = new Date(eventiMese.items[j].start.dateTime).getDate() - 1;
                oreProgetto[giornoProgetto] += sunmillis;
                ore[giornoProgetto] += sunmillis;
            }
            for (var k = 0; k < giorni; k++) {
                table += '<td>' + oreProgetto[k] + '</td>';
            }

            table += '<td>' + oreProgetto.reduce(function(a, b) {
                return a + b;
            }, 0); + '</td>';
            table += '</tr>';

        } else

        {
            var oreProgetto = new Array(giorni).fill(0);
            var oretot = new Array(giorni)
            var idProgetto = (resp.items[i].id)
            var request1 = await gapi.client.calendar.events.list({
                'calendarId': idProgetto,
                'timeMax': anno + '-' + mese + '-' + giorni + 'T23:59:59-02:00',
                'timeMin': anno + '-' + mese + '-01T00:00:00-02:00',
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            });
            const eventiMese = JSON.parse(request1.body);

            for (var j = 0; j < eventiMese.items.length; j++) {
                var start = new Date(eventiMese.items[j].start.dateTime);
                var end = new Date(eventiMese.items[j].end.dateTime);
                var sunmillis = (end - start) / 1000 / 60 / 60;
                var giornoProgetto = new Date(eventiMese.items[j].start.dateTime).getDate() - 1;
                oreProgetto[giornoProgetto] += sunmillis;
                ore[giornoProgetto] += sunmillis;
                progtot[giornoProgetto] += oreProgetto[giornoProgetto]
            }
        }
    }
    table += '<tr> <td >Atri progetti </td>'
    for (var k = 0; k < giorni; k++) {
        table += '<td> ' + progtot[k] + '</td>';
        console.log(progtot[k])
    }

    table += '<td >' + oreProgetto.reduce(function(a, b) {
        return a + b;
    }, 0); + '</td>';
    table += '</tr>';


    table += '<tr class="colors"> <td >Totale ore per mese: </td>';
    var contatore = 0;
    for (var h = 0; h < giorni; h++) {
        table += '<td>' + ore[h] + '</td>';
        contatore += ore[h];
    }
    table += '<td>' + contatore + '</td>';
    table += '</tr> </table>';

    document.getElementById("calendar").innerHTML = table;
};

function calcolaOre(giorno, mese, anno, id) {
    gapi.client.load('calendar', 'v3', function() {
        var request = gapi.client.calendar.events.list({
            'calendarId': id,
            'timeMax': anno + '-' + mese + '-' + getDaysInMonth(mese, anno) + 'T23:59:59-02:00',
            'timeMin': anno + '-' + mese + '-' + 01 + 'T00:00:00-02:00',
            'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
        });

        request.execute(function(resp) {
            var contatore = 0
            for (var i = 0; i < resp.items.length; i++) {

                var start = new Date(resp.items[i].start.dateTime);
                var end = new Date(resp.items[i].end.dateTime);
                var sunmillis = (end - start) / 1000 / 60 / 60;
                contatore += sunmillis;
            }
            return contatore;
        });
    });

}

function getPr() {
    gapi.client.load('calendar', 'v3', function() {
        var request = gapi.client.calendar.calendarList.list({})

        request.execute(function(resp) {
            for (var i = 0; i < resp.items.length; i++) {
                $("#progetto").
                append('<option id="progSel" value ="' + resp.items[i].id + '"> ' + resp.items[i].summary + '</option>')
            }
        });
    })
}

function createReport() {
    $("#first").css("display", "none")
    $("#second").css("display", "block")

    createTable()


    return false
}