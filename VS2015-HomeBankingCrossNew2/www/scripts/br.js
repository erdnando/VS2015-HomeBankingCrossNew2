
var urlws = "http://74.208.98.86/mx.com.homebanking.servicem2/mx.com.homebanking.servicem2.svc/";

function onDeviceReady() {

    //release
    //localStorage.setItem("ModeloDispositivo", device.model);
    //localStorage.setItem("Plataforma", device.platform + ' ' + device.version);
    //window.plugins.uniqueDeviceID.get(success, fail);
    //
    //debug
    localStorage.setItem("ModeloDispositivo", "SM-G935F");
    localStorage.setItem("Plataforma", "Android 7.0");
    success("50719c1d-475b-8185-3535-560875220038");
    
}

function success(uuid) {
    //alert("on success....");
    strUiid = replaceAll("+", "(", replaceAll("/", "@", uuid));
    //alert(strUiid);;;;;;;
    localStorage.setItem("UUID", strUiid);
    //return;
    var condition = navigator.onLine ? "ONLINE" : "OFFLINE";
    //condition = 'no';
    if (condition == "ONLINE") {
        //alert("1er inicio");
        
        inicioPrimeraVez();
    } else {
        //alert("no es 1er inicio");
        $.mobile.changePage('Error_Red.html');
    }
    
};

function fail(error) {
    alert(uuid);
};

function returnHomPage() {
    $.mobile.changePage('Hompage.html');
}

function replaceAll(find, replace, str) {
    while (str.indexOf(find) > -1) {
        str = str.replace(find, replace);
    }
    return str;
}

function goto(pagina) {
    location.href = pagina;
}

function inicioPrimeraVez() {

    var ValidarInicio = urlws + "VALIDAR_INICIAR/UUID/" + localStorage.getItem("UUID");
    //alert(ValidarInicio);
    $.ajax(
                {
                    type: "GET",
                    url: ValidarInicio,
                    data: "{}",
                    timeout: 9000,
                    cache: false,
                    contentType: "json",
                    success: function (objRegreso) {
                        if (objRegreso == undefined) {
                            objRegreso = "-1";
                            alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde');
                            $.mobile.changePage('PrimerInicio.html'); return;
                        }

                        
                        if (objRegreso.slice(0, 1) == "1") {
                            var DATOS = objRegreso.split("-");
                            console.log("cliente---->"+DATOS[1]);
                            localStorage.setItem("CLIENTE", DATOS[1]);
                            localStorage.setItem("NOMBRECLIENTE", DATOS[2]);
                            $.mobile.changePage('Hompage.html');
                        }
                        if (objRegreso.slice(0, 1) == "0") {
                            $.mobile.changePage('PrimerInicio.html');
                        }
                    },
                    error: function (jqXHR, exception) {
                        if (jqXHR.status === 0) {
                            $.mobile.changePage('Error_Red.html');
                        } else if (exception === 'timeout') {
                            alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde');
                            $.mobile.changePage('PrimerInicio.html'); return;
                        }
                    },
                    async: true
                }
            );
}

function exitFromApp() {
    var vent = confirm("¿Est\u00e1 seguro de salir?");

    if (vent) {
        navigator.app.exitApp();
    }
    else {
        return false;
    }
}

function validarNumeroTel() {

    document.getElementById('LoadingImageTEL').style.display = 'block';
    document.getElementById('LoadingImageTEL').style.background = "#C2BBBB url('images/loader.gif') no-repeat center";

    if (document.getElementById("numTelefono").value == "" || document.getElementById("numTelefono").value.length < 10) {
        alert("Ingrese un n\u00famero telef\u00f3nico valido");
        document.getElementById('LoadingImageTEL').style.display = 'none';
        return;
    }

    if (document.getElementById("InicioPassword").value == "") {
        alert("Ingrese una contrase\u00f1a valida");
        document.getElementById('LoadingImageTEL').style.display = 'none';
        return;
    }
    //alert(localStorage.getItem("ModeloDispositivo"));
    var primerInicio = urlws + 'PRIMER_INICIO_MOBILE/numTelefono/' + document.getElementById("numTelefono").value + '/pwd/' + document.getElementById("InicioPassword").value + '/modeloDispositivo/' + localStorage.getItem("ModeloDispositivo") + '/Plataforma/' + localStorage.getItem("Plataforma") + '/UUID/' + localStorage.getItem("UUID");
    //alert(primerInicio);
    $.ajax(
            {
                type: "GET",
                url: primerInicio,
                data: "{}",
                timeout: 9000,
                cache: false,
                contentType: "json",
                success: function (objRegreso) {
                    if (objRegreso == undefined) {
                        objRegreso = "-1";
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); return;
                    }
                    if (objRegreso.slice(0, 1) == "3") {
                        document.getElementById("numTelefono").value = "";
                        document.getElementById("InicioPassword").value = "";
                        document.getElementById('LoadingImageTEL').style.display = 'none';
                        alert("El n\u00famero telef\u00f3nico es incorrecto");
                        return;
                    }
                    if (objRegreso.slice(0, 1) == "5") {
                        document.getElementById("numTelefono").value = "";
                        document.getElementById("InicioPassword").value = "";
                        document.getElementById('LoadingImageTEL').style.display = 'none';
                        alert("La contrase\u00f1a es incorrecta");
                        return;
                    }
                    if (objRegreso.slice(0, 1) == "0") {
                        document.getElementById("numTelefono").value = "";
                        document.getElementById("InicioPassword").value = "";
                        document.getElementById('LoadingImageTEL').style.display = 'none';
                        alert("Este n\u00famero telef\u00f3nico ya se encuentra asociado a un cliente del banco");
                        return;

                    }
                    if (objRegreso.slice(0, 1) == "1") {
                        var DATOS = objRegreso.split("-");
                        alert("Se ha asociado exitosamente su n\u00famero telef\u00f3nico");
                        localStorage.setItem("NumTelefonico", document.getElementById("numTelefono").value);
                        localStorage.setItem("CLIENTE", DATOS[1]);
                        localStorage.setItem("NOMBRECLIENTE", DATOS[2]);
                        //localStorage.setItem("LLAVE", DATOS[3]);

                        document.getElementById('LoadingImageTEL').style.display = 'none';
                        $.mobile.changePage('Hompage.html'); return;
                        return;
                    }
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        document.getElementById('LoadingImageTEL').style.display = 'none';
                        $.mobile.changePage('Error_Red.html'); return;
                    } else if (exception === 'timeout') {
                        document.getElementById('LoadingImageTEL').style.display = 'none';
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); return;
                    }
                },
                async: true
            }
        );

}

function callPhone() {
    var number = '9626254321';
    Ti.Platform.openURL("tel:" + number);
}

function realoadPage() {
    document.getElementById('btnReload').src = "images/refresh2.gif";
    //inicioPrimeraVez();

    var condition = navigator.onLine ? "ONLINE" : "OFFLINE";
    //condition = 'no';
    if (condition == "ONLINE") {
        //alert("1er inicio");
        inicioPrimeraVez();
    } else {
        //alert("no es 1er inicio");
        $.mobile.changePage('Error_Red.html');
    }
};


function mytest(result){
    alert(result);
}

function generaToken() {

    var noCliente = document.getElementById("txtCliente").value;

    $("#txtToken").val("");
    document.getElementById("imgReloadTk").innerHTML = "<input type='image' src='images/loader.gif' width='50' height='50'>";
    //$('.progress-message').html('Generando Token espere por favor!');

    if (document.getElementById("txtCliente").value == "") {
        alert("Ingrese un cliente");
        document.getElementById('Indexes').style.display = 'none';
        return;
    }


    
    //MyCordovaPlugin.getDate(mytest);


    //localStorage.setItem("LLAVE", DATOS[3]);
    var secret ="B2374TNIQ3HKC446";// "SGSTDTZDZKASAWDAADWelcomeD";
    // initialize OTP 
    var generator = new AeroGear.Totp(secret);


    // generate token 
    generator.generateOTP(function (tokenObtenido) {
      
        console.log("tokenObtenido-->" + tokenObtenido);
        var d = new Date();
        //var n = d.getSeconds();
        var TIME = d.getSeconds();
        console.log("segundo.........." + TIME);
        var TK = tokenObtenido;

        if (TK == undefined) {
            document.getElementById("imgReloadTk").innerHTML = "";

            tokenObtenido = "-1";
            $("#txtToken").val(""); return;
        }
        if (TK == "0") {
            document.getElementById("imgReloadTk").innerHTML = "";
            //$('.progress-message').html('');
            alert("Cliente incorrecto, verifique");
            $("#txtToken").val(""); return;
        } else {
            document.getElementById("generatoken").disabled = true;
            localStorage.setItem("TOKEN", TK);
            $('#txtToken').attr("value", TK);
            document.getElementById("imgReloadTk").innerHTML = "";
            progressbar(parseInt(TIME));
        }

    });
    
    

    /*
        var TOKEN = 'http://74.208.98.86/Stefanini/mx.com.homebanking.otp.api/Service1.svc/GET_TOKEN/nocliente/' + noCliente;
    console.log(TOKEN);
    $.ajax(
            {
                type: "GET",
                url: TOKEN,
                data: "{}",
                timeout: 9000,
                cache: false,
                contentType: "json",
                success: function (tokenObtenido) {
                    console.log("tokenObtenido-->" + tokenObtenido);
                    //var TK_COMPLETO = tokenObtenido.split(",");
                    //var tk_Obtenido = TK_COMPLETO[1].split(".");

                    //var TIME = tk_Obtenido[0];
                    //var TK = tk_Obtenido[1];
                    var d = new Date();
                    //var n = d.getSeconds();
                    var TIME = d.getSeconds();
                    console.log("segundo.........."+TIME);
                    var TK = tokenObtenido;
                    
                    if (TK == undefined) {
                        document.getElementById("imgReloadTk").innerHTML = "";
                        
                        tokenObtenido = "-1";
                        $("#txtToken").val(""); return;
                    }
                    if (TK == "0") {
                        document.getElementById("imgReloadTk").innerHTML = "";
                        //$('.progress-message').html('');
                        alert("Cliente incorrecto, verifique");
                        $("#txtToken").val(""); return;
                    } else {
                        document.getElementById("generatoken").disabled = true;
                        localStorage.setItem("TOKEN", TK);
                        $('#txtToken').attr("value", TK);
                        document.getElementById("imgReloadTk").innerHTML = "";
                        progressbar(parseInt(TIME));
                    }



                },
                error: function (jqXHR, exception) {
                    console.log("exception-->" + exception);
                    if (jqXHR.status === 0) {
                        document.getElementById('Indexes').style.display = 'none';
                        $.mobile.changePage('Error_Red.html');
                    } else if (exception === 'timeout') {
                        document.getElementById('Indexes').style.display = 'none';
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); return;
                    }
                },
                async: false
            }
        );*/

}

//----------otp---------------------------------------



//----------otp---------------------------------------

function progressbar(value) {

    //var value = contador;

   // var timerr = (30 - Math.round(((30 / 100) * parseInt(contador))));

    //if (parseInt(contador) == 0) { timerr = 30; }
    
    var maxVal = 30;
    var interval;
    var duration = 999;

    var IncrementProgressBar = function () {

        if (value > maxVal) {
            value = (value - maxVal);
        }
        if (value == maxVal) {
            document.getElementById("generatoken").disabled = false;
            document.getElementById('progressbar').value = 0;
            value = 0;
            $('.progress-time').html('');
            localStorage.setItem("TOKEN", "");
            $('.progress-message').html('Ha expirado el Token genere uno nuevo!');
            clearInterval(interval);
            return;
        }
        
       // $('.progress-message').html('Token Activo!');

        document.getElementById('progressbar').value = value;

        /*if (value == 1 || value == 3 || value == 5 || value == 7 || value == 9 || value == 11 || value == 14 || value == 17 || value == 20 || value == 23 || value == 26 || value == 29 || value == 32 || value == 35 || value == 38 || value == 41 || value == 44 || value == 47 || value == 50 || value == 53 || value == 56 || value == 59 || value == 62 || value == 65 || value == 68 || value == 71 || value == 74 || value == 77 || value == 80 || value == 83 || value == 86 || value == 89 || value == 92 || value == 95 || value == 97) {
            $('.progress-time').html('Queda ' + (timerr--) + ' Seg.');
        }*/

        value = value + 1;
    }

    interval = setInterval(function () { IncrementProgressBar(); $('.progress-value').html(value + '%'); }, duration);
}

function getParameterByName(name) {
    return localStorage.getItem(parametro);
}

function validaUsuario() {
    
    ////!!!NOTA IMPORTANTE!!!
    ////No quitar los HREF de esta funcion debido a que si se le cambian por el $.mobile.changePage deja de funcionar
    ////En su defecto No inicia sesion y nunca cargan las funciones del Ready en la pagina de BancaMovil.html

    if (document.getElementById("txtUser").value == "") {
        //jAlert('This is a custom alert box', 'Alert Dialog');
       
        alert("El cliente es requerido");
        location.href = 'index.html'; return;
    }

    if (document.getElementById("txtPwd").value == "") {
        //jAlert('El password es requerido', 'Alert', function (r) {
        //    alert("El password es requerido");
        //    //location.href = 'index.html'; return;
        //});

        //jAlert('This is a custom alert box', 'Alert Dialog');
        alert("El password es requerido");
        location.href = 'index.html';return;
    }

    var GET_TOKEN = urlws + 'LOGIN/nocliente/' + document.getElementById("txtUser").value + '/pwd/' + document.getElementById("txtPwd").value;

    $.ajax(
            {
                type: "GET",
                url: GET_TOKEN,
                data: "{}",
                timeout: 9000,
                contentType: "json",
                success: function (objRegreso) {
                    if (objRegreso == undefined) {
                        objRegreso = "-1";
                    }
                    else {
                        if (objRegreso == '0'){
                            alert('Datos incorrectos');
                            CLIENTE = "0";
                            location.href = 'Hompage.html'; return;    //{ transition: "flow", reverse: false }
                        }
                        else {
                            CLIENTE = document.getElementById("txtUser").value;
                            PASSWORD = document.getElementById("txtPwd").value;
                            localStorage.setItem("CLIENTE", CLIENTE);
                            localStorage.setItem("PASSWORD", PASSWORD);
                            location.href = 'BancaMovil.html';
                        }
                    }
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        alert('A ocurrido un problema de red; intente de nuevo, o m\u00e1s tarde');
                        location.href = 'index.html'; return;
                    } else if (jqXHR.status == 404) {
                        alert('Not fount [Error: 400].');
                        location.href = 'index.html'; return;
                    } else if (jqXHR.status == 500) {
                        alert('[Error: 500].');
                        location.href = 'index.html'; return;
                    }
                    if (exception === 'parsererror') {
                        alert('parser error');
                        location.href = 'index.html'; return;
                    } else if (exception === 'timeout') {
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde');
                        location.href = 'index.html'; return;
                    } else if (exception === 'abort') {
                        alert('abort');
                        location.href = 'index.html'; return;
                    } else {
                        //alert('Undefined');
                        location.href = 'index.html'; return;
                    }
                },
                async: true
            }
        );

    document.getElementById("btnLogin").disabled = false;

}

function creaIconos() {
    menuPadres();
    
    menuHijos();
   
    menuPaginas();
   
}

function menuPadres() {

    var GET_TOKEN = urlws + 'GET_PADRES';

    $.ajax(
            {
                type: "GET",
                url: GET_TOKEN,
                data: "{}",
                timeout: 9000,
                cache: false,
                contentType: "json",
                success: function (padresObtenidos) {
                    armaPadres(padresObtenidos);
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        $.mobile.changePage('Error_Red.html');
                    } else if (exception === 'timeout') {
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                    }
                },
                async: true
            }
        );
}

function menuHijos() {

    var client = localStorage.getItem("CLIENTE");

    var GET_TOKEN = urlws + 'GET_HIJOS/nocliente/' + client;

    $.ajax(
            {
                type: "GET",
                url: GET_TOKEN,
                data: "{}",
                timeout: 9000,
                cache: false,
                contentType: "json",
                success: function (hijosObtenidos) {
                    armaHijos(hijosObtenidos);
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        $.mobile.changePage('Error_Red.html');
                    } else if (exception === 'timeout') {
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                    }
                },
                async: true
            }
        );
}

function menuPaginas() {

    var GET_TOKEN = urlws + 'GET_PAGINAS';

    $.ajax(
            {
                type: "GET",
                url: GET_TOKEN,
                data: "{}",
                timeout: 9000,
                cache: false,
                contentType: "json",
                success: function (paginasObtenidos) {
                    armaPaginas(paginasObtenidos);
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        $.mobile.changePage('Error_Red.html');
                    } else if (exception === 'timeout') {
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                    }
                },
                async: true
            }

        );
}

function armaPadres(arrayPadres) {

    var ptContainer = document.getElementById('MnContainer');

    var divMenu = document.createElement("div");
    divMenu.className = "pt-menu";

    for (var j = 0; j < arrayPadres.length; j++) {

        var a = document.createElement("a");
        a.className = "ui-btn-menu";
        a.setAttribute('data-transition', 'flow');
        a.href = arrayPadres[j].href;

        var img = document.createElement("img");
        img.src = arrayPadres[j].img;
        img.style.margin = "0 auto";
        img.style.display = "block";
        img.style.height = "55px";
        img.style.width = "70px";
        a.appendChild(img);
        
        var txt = document.createTextNode(arrayPadres[j].operacion);
        a.appendChild(txt);

        divMenu.appendChild(a);
        ptContainer.appendChild(divMenu);
    }

}

function armaHijos(arrayHijos) {

    var body = document.getElementById('cuerpo');
    var cambio = 0;

    for (var k = 0; k < arrayHijos.length; k++) {

        if (arrayHijos[k].attribute == 'transferir' && arrayHijos[k - 1].attribute != 'transferir') { cambio = 0; }
        if (arrayHijos[k].attribute == 'actualizar' && arrayHijos[k - 1].attribute != 'actualizar') { cambio = 0; }
        if (arrayHijos[k].attribute == 'pagoservicio' && arrayHijos[k - 1].attribute != 'pagoservicio') { cambio = 0; }

        if (cambio == 0) {
            var divSubIcono1 = document.createElement("div");
            divSubIcono1.setAttribute('data-url', 'demo-page');
            divSubIcono1.setAttribute('data-role', "page");
            divSubIcono1.setAttribute('data-theme', "b");
            divSubIcono1.setAttribute('id', arrayHijos[k].attribute); ////aqui se mueve
            divSubIcono1.className = "my-page";

            var divHeader1 = document.createElement("div");
            divHeader1.setAttribute('data-role', "header");
            
            var divHeader2 = document.createElement("div");
            divHeader2.className = "ui-btn-left";
            divHeader2.setAttribute('data-type', 'horizontal');
            divHeader2.setAttribute('data-iconpos', 'notext');

            var a1Header = document.createElement("a");
            a1Header.onclick = function () {
                location.href = 'Hompage.html';
            };
            a1Header.setAttribute('data-role', "button");
            a1Header.setAttribute('data-iconpos', "notext");
            a1Header.setAttribute('data-icon', "home");
            a1Header.className = "ui-nodisc-icon";
            a1Header.innerHTML = "Home";

            divHeader2.appendChild(a1Header);

            var a2Header = document.createElement("a");
            a2Header.onclick = function () {
                exitFromApp(); return;
            };
            a2Header.setAttribute('data-role', "button");
            a2Header.setAttribute('data-iconpos', "notext");
            a2Header.setAttribute('data-icon', "exitx");
            a2Header.className = "ui-nodisc-icon";
            a2Header.innerHTML = "Exit";

            divHeader2.appendChild(a2Header);
            divHeader1.appendChild(divHeader2);

            var a3Header = document.createElement("img");
            a3Header.src = "images/logo.png";
            a3Header.style.width = "60px";
            a3Header.style.height = "15px";

            divHeader1.appendChild(a3Header);

            var divHeader3 = document.createElement("div");
            divHeader3.className = "ui-btn-right";
            divHeader3.setAttribute('data-type', 'horizontal');
            divHeader3.setAttribute('data-iconpos', 'notext');

            var a4Header = document.createElement("a");
            a4Header.href = "./";
            a4Header.setAttribute('data-role', "button");
            a4Header.setAttribute('data-iconpos', "notext");
            a4Header.setAttribute('data-icon', "carat-l");
            a4Header.setAttribute('data-rel', "back");
            a4Header.className = "ui-nodisc-icon";
            a4Header.innerHTML = "Back";

            divHeader3.appendChild(a4Header);
            divHeader1.appendChild(divHeader3);

            divSubIcono1.appendChild(divHeader1);

            var content = document.createElement("div");
            content.setAttribute('data-role', "content");
            content.className = "contendet";
            content.id = arrayHijos[k].content; /////aqui tambien se le mueve
            var content1 = document.createElement("div");
            content1.setAttribute('data-role', "main");
            content1.className = "ui-content";

            var divMenu = document.createElement("div");
            divMenu.className = "pt-menu";
        }

        var a = document.createElement("a");
        a.className = "ui-btn-menu";
        a.setAttribute('data-transition', 'flow');
        a.href = arrayHijos[k].href;   

        if (arrayHijos[k].onclick != '') {
            a.setAttribute("onClick", arrayHijos[k].onclick);  
        }

        var img = document.createElement("img");
        img.src = arrayHijos[k].img;;
        img.style.margin = "0 auto";
        img.style.display = "block";
        img.style.height = "55px";
        img.style.width = "70px";
        a.appendChild(img);

        var txt = document.createTextNode(arrayHijos[k].innerHTML1);
        a.appendChild(txt);

        divMenu.appendChild(a);

        if (cambio == 0) {

            var divFooter1 = document.createElement("div");
            divFooter1.setAttribute('data-role', "footer");
            divFooter1.setAttribute('data-position', "fixed");

            var a11footer = document.createElement("div");
            a11footer.innerHTML = create_footer();

            divFooter1.appendChild(a11footer);
            divSubIcono1.appendChild(divFooter1);

            content1.appendChild(divMenu);
            content.appendChild(content1);
            divSubIcono1.appendChild(content);

            body.appendChild(divSubIcono1);

            cambio = 1;
        }

    }////Aqui termina el ciclo for

}

function armaPaginas(arrayPaginas) {

    var body = document.getElementById('cuerpo');
    var cambios1 = 0;

    for (var l = 0; l < arrayPaginas.length; l++) {

        cambios1 = 0;
        
        if (cambios1 == 0) {
            var divSubIcono2 = document.createElement("div");
            divSubIcono2.setAttribute('data-url', 'demo-page');
            divSubIcono2.setAttribute('data-role', "page");
            divSubIcono2.setAttribute('data-theme', "b");
            divSubIcono2.setAttribute('id', arrayPaginas[l].attribute); ////aqui se mueve
            divSubIcono2.className = "my-page";

            var divHeader22 = document.createElement("div");
            divHeader22.setAttribute('data-role', "header");
            //divHeader22.setAttribute('data-position', "fixed");

            var divHeader222 = document.createElement("div");
            divHeader222.className = "ui-btn-left";
            divHeader222.setAttribute('data-type', 'horizontal');
            divHeader222.setAttribute('data-iconpos', 'notext');

            var a11Header = document.createElement("a");
            a11Header.onclick = function () {
                location.href = 'Hompage.html';
            };
            a11Header.setAttribute('data-role', "button");
            a11Header.setAttribute('data-iconpos', "notext");
            a11Header.setAttribute('data-icon', "home");
            a11Header.className = "ui-nodisc-icon";
            a11Header.innerHTML = "Home";

            divHeader222.appendChild(a11Header);

            var a22Header = document.createElement("a");
            a22Header.onclick = function () {
                exitFromApp(); return;
            };
            a22Header.setAttribute('data-role', "button");
            a22Header.setAttribute('data-iconpos', "notext");
            a22Header.setAttribute('data-icon', "exitx");
            a22Header.className = "ui-nodisc-icon";
            a22Header.innerHTML = "Exit";

            divHeader222.appendChild(a22Header);
            divHeader22.appendChild(divHeader222);

            var a33Header = document.createElement("img");
            a33Header.src = "images/logo.png";
            a33Header.style.width = "60px";
            a33Header.style.height = "15px";

            divHeader22.appendChild(a33Header);

            var divHeader33 = document.createElement("div");
            divHeader33.className = "ui-btn-right";
            divHeader33.setAttribute('data-type', 'horizontal');
            divHeader33.setAttribute('data-iconpos', 'notext');

            var a44Header = document.createElement("a");
            a44Header.href = "./";
            a44Header.setAttribute('data-role', "button");
            a44Header.setAttribute('data-iconpos', "notext");
            a44Header.setAttribute('data-icon', "carat-l");
            a44Header.setAttribute('data-rel', "back");
            a44Header.className = "ui-nodisc-icon";
            a44Header.innerHTML = "Back";

            divHeader33.appendChild(a44Header);

            divHeader22.appendChild(divHeader33);

            divSubIcono2.appendChild(divHeader22);
        }


        var content_1 = document.createElement("div");
        content_1.setAttribute('data-role', "content");
        content_1.className = "contendet";
        content_1.id = arrayPaginas[l].content; /////aqui tambien se le mueve

        var content1_1 = document.createElement("div");
        content1_1.setAttribute('data-role', "main");
        content1_1.className = "ui-content";
        content1_1.innerHTML = arrayPaginas[l].innerHTML;////aqui cambia tambien

        var content1_11 = document.createElement("div");
        content1_11.id = arrayPaginas[l].div; ////aqui tambien se le mueve
        content1_11.className = "datagrid";

        content1_1.appendChild(content1_11);
        content_1.appendChild(content1_1);
        divSubIcono2.appendChild(content_1);

        if (cambios1 == 0) {

            var divFooter2 = document.createElement("div");
            divFooter2.setAttribute('data-role', "footer");
            divFooter2.setAttribute('data-position', "fixed");

            var a22footer = document.createElement("div");
            a22footer.innerHTML = create_footer();
            
            divFooter2.appendChild(a22footer);
            divSubIcono2.appendChild(divFooter2);

            body.appendChild(divSubIcono2);

            cambios1 = 1;
        }
    }////Aqui termina el ciclo for

}

////Obtengo las Nuevas Preguntas
function getPreguntas1() {

    document.getElementById('LoadingImage').style.display = 'block';
    document.getElementById('LoadingImage').style.background = "#C2BBBB url('images/loader.gif') no-repeat center";

    var GET_TOKEN = urlws + 'GET_PREGUNTAS';

    $.ajax(
            {
                type: "GET",
                url: GET_TOKEN,
                data: "{}",
                timeout: 9000,
                cache: false,
                contentType: "json",
                success: function (preguntasObtenidas1) {


                    ////Aqui limpia los elementos para que no haya problemas
                    document.getElementById('passwordActual').value = '';
                    document.getElementById('txtRespuesta').value = '';

                    //aqui creamos el select
                    document.getElementById("preguntas1").innerHTML = "";
                    var myDiv = document.getElementById("preguntas1");
                    var selectList = document.createElement("select");
                    selectList.style.width = "600px";
                    selectList.id = "idPreguntaActual";
                    myDiv.appendChild(selectList);

                    var option = document.createElement("option");
                    option.value = "";
                    option.text = "Pregunta Secreta";
                    option.selected = "selected";
                    selectList.appendChild(option);

                    for (var e2 = 0; e2 < preguntasObtenidas1.length; e2++) {

                        //aqui pintamos el select
                        var option = document.createElement("option");
                        option.value = preguntasObtenidas1[e2].idPregunta;
                        option.text = preguntasObtenidas1[e2].pregunta;
                        selectList.appendChild(option);

                    }

                    //Con esto no perdemos el stilo, aseguramos que siempre este activo el Data Mini =  true
                    $('select').selectmenu({ mini: true });

                    document.getElementById('LoadingImage').style.display = 'none';

                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        $.mobile.changePage('Error_Red.html');
                    } else if (exception === 'timeout') {
                        document.getElementById('LoadingImage').style.display = 'none';
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                    }
                },
                async: true
            }
        );

}

function getPreguntas2() {

    document.getElementById('LoadingImage').style.display = 'block';
    document.getElementById('LoadingImage').style.background = "#C2BBBB url('images/loader.gif') no-repeat center";

    var GET_TOKEN = urlws + 'GET_PREGUNTAS';

    $.ajax(
            {
                type: "GET",
                url: GET_TOKEN,
                data: "{}",
                timeout: 9000,
                cache: false,
                contentType: "json",
                success: function (preguntasObtenidas2) {

                    ////Aqui limpia los elementos para que no haya problemas
                    document.getElementById('passwordActual').value = '';
                    document.getElementById('txtRespuesta').value = '';

                    document.getElementById('newPassword').value = '';
                    document.getElementById('confirmarPassword').value = '';
                    document.getElementById('newRespuesta').value = '';

                    $("#idPreguntaActual option[value='']").attr('selected', 'selected');
                    $('#idPreguntaActual').selectmenu('refresh');

                    //aqui creamos el select

                    document.getElementById("preguntas2").innerHTML = "";
                    var myDiv = document.getElementById("preguntas2");
                    var selectList = document.createElement("select");
                    selectList.style.width = "600px";
                    selectList.id = "idPreguntaActualX";
                    myDiv.appendChild(selectList);

                    var option = document.createElement("option");
                    option.value = "";
                    option.text = "Pregunta Secreta";
                    option.selected = "selected";
                    selectList.appendChild(option);

                    for (var e4 = 0; e4 < preguntasObtenidas2.length; e4++) {

                        //aqui pintamos el select
                        var option = document.createElement("option");
                        option.value = preguntasObtenidas2[e4].idPregunta;
                        option.text = preguntasObtenidas2[e4].pregunta;
                        selectList.appendChild(option);

                    }

                    //Con esto no perdemos el stilo, aseguramos que siempre este activo el Data Mini =  true
                    $('select').selectmenu({ mini: true });

                    document.getElementById('LoadingImage').style.display = 'none';
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        $.mobile.changePage('Error_Red.html');
                    } else if (exception === 'timeout') {
                        document.getElementById('LoadingImage').style.display = 'none';
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                    }
                },
                async: true
            }
        );

}

////Obtener los datos cliente
function validarDatosCliente() {

    if (document.getElementById('passwordActual').value == '' || document.getElementById("idPreguntaActual").value == '' || document.getElementById('txtRespuesta').value == '') {
        alert('No deje campos vac\u00edos, complete el formulario');
    }

    var user = localStorage.getItem("CLIENTE");
    var cve = document.getElementById('passwordActual').value;
    var idPregunta = document.getElementById("idPreguntaActual").value;
    var respSecreta = document.getElementById('txtRespuesta').value;

    var GET_PREGUNTA = urlws + 'LOGIN_COMPLETO/user/' + user + '/cve/' + cve + '/idPregunta/' + idPregunta + '/respSecreta/' + respSecreta;

    $.ajax(
            {
                type: "GET",
                url: GET_PREGUNTA,
                data: "{}",
                timeout: 9000,
                cache: false,
                contentType: "json",
                success: function (preguntaRegreso) {
                    if (preguntaRegreso == undefined) {
                        preguntaRegreso = "-1";
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); return;
                    }
                    if (preguntaRegreso != "0") {
                        getPreguntas2();
                        $.mobile.changePage('#frmCambiarPassword'); return;
                    }
                    if (preguntaRegreso == "0") {
                        alert('Datos incorrectos, Verifique nuevamente');
                        user = "0";
                        return;
                    }
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        $.mobile.changePage('Error_Red.html');
                    } else if (exception === 'timeout') {
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); return;
                    }
                },
                async: true
            }
        );


}

////Actualizar nueva contraseña a la BD
function insertarNuevosDatos() {

    var password_actual = localStorage.getItem("PASSWORD");
    var numero_cliente = localStorage.getItem("CLIENTE");

    var newpasswordS = document.getElementById('newPassword').value;
    var confirmarpasswordS = document.getElementById('confirmarPassword').value;
    var newpreguntaS = document.getElementById('idPreguntaActualX').value;
    var newrespuestaS = document.getElementById('newRespuesta').value;

    if (newpasswordS == '' || confirmarpasswordS == '' || newpreguntaS == '' || newrespuestaS == '') {
        alert('No deben de quedar campos vac\u00edos');
        return;
    }

    if (newpasswordS != confirmarpasswordS) {
        alert('La contrase\u00f1a no coinciden');
        return;
    }

    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/.test(newpasswordS)) {
        alert('La contrase\u00f1a debe de contener mas de 6 digitos, por lo menos un digito una letra en may\u00fascula y un car\u00e1cter especial');
        return;
    }

    if (newpasswordS == confirmarpasswordS && newpreguntaS != '' && newrespuestaS != '') {

        insertarContrasenia(password_actual, numero_cliente, newpasswordS, newpreguntaS, newrespuestaS);
        return;
    }
}

////Ingresa la nueva Contraseña del usuario a la Base de datos        ******Momento Critico******
function insertarContrasenia(passActual, num_cliente, newPassword, newIDPregunta, newRespuesta) {

    localStorage.setItem("waiting", 1); //Esta es la Bandera que dira si permite terminar el procesos cuando el telefono Hiberne.

    document.getElementById('LoadingImage').style.display = 'block';
    document.getElementById('LoadingImage').style.background = "#C2BBBB url('images/loader.gif') no-repeat center";

    var NEW_CONTRASENIA = urlws + 'ACTUALIZA_CONTRASENIA/noCliente/' + num_cliente + '/cveActual/' + passActual + '/nuevaClave/' + newPassword + '/idPregunta/' + newIDPregunta + '/respuesta/' + newRespuesta;
   // alert(NEW_CONTRASENIA);
    $.ajax(
            {
                type: "GET",
                url: NEW_CONTRASENIA,
                data: "{}",
                timeout: 9000,
                cache: false,
                contentType: "json",
                success: function (newContraseniaRegreso) {
                    if (newContraseniaRegreso == undefined) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        newContraseniaRegreso = "-1";
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); return;
                    }
                    if (newContraseniaRegreso != "0") {
                        document.getElementById('LoadingImage').style.display = 'none';
                        alert('Tus datos han sido actualizados correctamente');
                        localStorage.setItem("waiting", 0);
                        $.mobile.changePage('Hompage.html');
                    }
                    if (newContraseniaRegreso == "0") {
                        document.getElementById('LoadingImage').style.display = 'none';
                        alert('Tus datos no han sido actualizados');
                        localStorage.setItem("waiting", 0);
                        $.mobile.changePage('Hompage.html');
                    }
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        localStorage.setItem("waiting", 0);
                        alert('A ocurrido un error de red; intente de nuevo, o m\u00e1s tarde'); return;
                    } else if (exception === 'timeout') {
                        document.getElementById('LoadingImage').style.display = 'none';
                        localStorage.setItem("waiting", 0);
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); return;
                    }
                },
                async: true
            }
        );

}

////Validacion de las Cuentas Propias 
function validarCuentasPropias() {

    var ObtenerSerie = document.getElementById("CuentaCargo").options[document.getElementById("CuentaCargo").selectedIndex].text;
    var longSerie = ObtenerSerie.split(" ");
    var SerieNum = parseFloat(longSerie[3].substring(1));

    if (SerieNum < parseFloat(document.getElementById('ImporteTranspaso').value)) {
        alert("No cuentas con saldo suficiente"); return;
    }
    //alert(document.getElementById('ImporteTranspaso').value + " > " + SerieNum);

    var fecha = new Date();
    var fecha_hora = ('0' + fecha.getDate()).slice(-2) + '/' + ('0' + (fecha.getMonth() + 1)).slice(-2) + '/' + fecha.getFullYear() + ' ' + fecha.getHours() + ':' + ('0' + fecha.getMinutes()).slice(-2) + ':' + fecha.getSeconds();
    document.getElementById('FechaOperacion').value = fecha_hora;

    var montoEntreCuentasPropias = "";
    var ITP = 0;
    montoEntreCuentasPropias = document.getElementById('ImporteTranspaso').value;
    document.getElementById('ImporteTranspaso').value = "";

    if (montoEntreCuentasPropias.indexOf(".") > 0) {
        document.getElementById('ImporteTranspaso').value = '$ ' + montoEntreCuentasPropias;   //significa que si tiene decimales no se le agrega ceros
    }
    else {
        document.getElementById('ImporteTranspaso').value = '$ ' + montoEntreCuentasPropias + '.00'; //significa que no tiene deciameles por eso se le agrega ceros
        ITP = 1;
    }
    /*          ESTO ES PARA VER COMO SE CREA EN ARRYAS Y PONERLOS EN EL SELECT
    var cadena_cortar_Servicios = document.getElementById('ServicioaPagar').value.split("-");
    document.getElementById('Referencia_Pago').value = cadena_cortar_Servicios[0];   
    */

    var CuentaCargoSelectPropias = document.getElementById('CuentaCargo').value.split("-"); // Variable Universal para obtener los Datos que trae el Select

    document.getElementById('DescripCorta_').value = document.getElementById('DescripCorta').value;
    document.getElementById('Reference_').value = document.getElementById('Reference').value;
    document.getElementById('CuentaCargo_').value = "*****" + CuentaCargoSelectPropias[0].substring(9);
    document.getElementById('Cuenta_Cargo_Completa_Propias').value = CuentaCargoSelectPropias[0]; //Este esta oculto se necesita para obtener completo el numero de cuenta cargo
    document.getElementById('Cuenta_Cargo_Propias_SnProducto').value = CuentaCargoSelectPropias[1]; //Este esta oculto se necesita para obtener completo el numero de Producto
    //En el siguiente no lo necesito debido a que el valor es ese mismo que se envia; no necesito otro valor mas!!!
    document.getElementById('CuentaDeposito_').value = "*****" + (document.getElementById('CuentaDeposito').value).substring(9);
    document.getElementById('Cuenta_Deposito_Completa').value = document.getElementById('CuentaDeposito').value; //Este esta oculto se necesita para obtener complleto el numero de cuenta deposito
    document.getElementById('ImporteTranspaso_').value = document.getElementById('ImporteTranspaso').value;

    if (ITP == 1) {
        document.getElementById('ImporteTranspaso').value = (document.getElementById('ImporteTranspaso').value).slice(2, -3);
        ITP = 0;
    }
    else {
        document.getElementById('ImporteTranspaso').value = (document.getElementById('ImporteTranspaso').value).slice(2);
    }

    if (document.getElementById('Reference').value.length < 7) {
        alert('La longitud de referencia es muy corta'); return;
    }
    if (document.getElementById('DescripCorta').value == '' || document.getElementById('Reference').value == '' || document.getElementById('CuentaCargo').value == '' || document.getElementById('CuentaDeposito').value == '' || document.getElementById('ImporteTranspaso').value == '') {
        alert('No deje campos vac\u00edos, complete el formulario'); return;
    }
    else {
        $.mobile.changePage('#frmConfirmarPropias'); return;
    }


}

////Validacion de las Cuentas a Terceros 
function validarCuentasTerceros() {

    var ObtenerSerie = document.getElementById("CuenCargo").options[document.getElementById("CuenCargo").selectedIndex].text;
    var longSerie = ObtenerSerie.split(" ");
    var SerieNum = parseFloat(longSerie[3].substring(1));

    if (SerieNum < parseFloat(document.getElementById('ImporTranspaso').value)) {
        alert("No cuentas con saldo suficiente"); return;
    }

    //if (document.getElementById('Referencia').value.length < 18) {
    //    alert('La longitud de referencia es muy corta'); return;
    //}
    if (document.getElementById('DescriCorta').value == '' || document.getElementById('Referencia').value == '' || document.getElementById('CuenCargo').value == '' || document.getElementById('NombreCuenta').value == '' || document.getElementById('FechaTranspaso').value == '' || document.getElementById('ImporTranspaso').value == '') {
        alert('No deje campos vac\u00edos, complete el formulario'); return;
    }
    else {
        var Terceros = urlws + 'Existe_CT_Terceros/Descripcion/' + document.getElementById('DescriCorta').value;

        $.ajax(
                {
                    type: "GET",
                    url: Terceros,
                    data: "{}",
                    timeout: 90000,
                    cache: false,
                    contentType: "json",
                    success: function (NTerceros) {
                        if (NTerceros == undefined) {
                            NTerceros = "-1";
                            alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); return;
                        }
                        else {
                            if (NTerceros == '1') {
                                alert('Esta descripci\u00f3n ya existe!!'); return;
                            }
                            if (NTerceros == '0') {

                                //Hoy
                                if (document.getElementById('FechaTranspaso').value == '0') {
                                    var fecha = new Date();
                                    var fecha_hora = ('0' + fecha.getDate()).slice(-2) + '/' + ('0' + (fecha.getMonth() + 1)).slice(-2) + '/' + fecha.getFullYear() + ' ' + fecha.getHours() + ':' + ('0' + fecha.getMinutes()).slice(-2) + ':' + fecha.getSeconds();
                                    document.getElementById('FechaOperacion_').value = fecha_hora;
                                }
                                //Mañana
                                if (document.getElementById('FechaTranspaso').value == '1') {
                                    var fecha = new Date();
                                    var fecha_hora = ('0' + (fecha.getDate() + 1)).slice(-2) + '/' + ('0' + (fecha.getMonth() + 1)).slice(-2) + '/' + fecha.getFullYear();
                                    document.getElementById('FechaOperacion_').value = fecha_hora;
                                }

                                var montoEntreCuentasTerceros = "";
                                var ITP = 0;
                                montoEntreCuentasTerceros = document.getElementById('ImporTranspaso').value;
                                document.getElementById('ImporTranspaso').value = "";

                                if (montoEntreCuentasTerceros.indexOf(".") > 0) {
                                    document.getElementById('ImporTranspaso').value = '$ ' + montoEntreCuentasTerceros;   //significa que si tiene decimales no se le agrega ceros
                                }
                                else {
                                    document.getElementById('ImporTranspaso').value = '$ ' + montoEntreCuentasTerceros + '.00'; //significa que no tiene deciameles por eso se le agrega ceros
                                    ITP = 1;
                                }

                                var CuentaCargoSelectTerceros = document.getElementById('CuenCargo').value.split("-"); // Variable Universal para obtener los Datos que trae el Select

                                document.getElementById('DesCorta_').value = document.getElementById('DescriCorta').value;
                                document.getElementById('Refer_').value = document.getElementById('Referencia').value;
                                document.getElementById('CuenCargo_').value = "*****" + CuentaCargoSelectTerceros[0].substring(9);
                                document.getElementById('cuentaCargoCompletaTerceros').value = CuentaCargoSelectTerceros[0]; //Esto esta oculto y lo necesitamos par aobtener completo el No de cuenta
                                document.getElementById('cuentaCargoTercerosNProducto').value = CuentaCargoSelectTerceros[1]//Este esta oculto se necesita para obtener completo el numero de Producto
                                document.getElementById('NoCuenCargo').value = document.getElementById('NombreCuenta').value;
                                document.getElementById('NombreCuent_').value = document.getElementById("NombreCuenta").options[document.getElementById("NombreCuenta").selectedIndex].text;
                                document.getElementById('ImporTranspaso_').value = document.getElementById('ImporTranspaso').value;

                                if (ITP == 1) {
                                    document.getElementById('ImporTranspaso').value = (document.getElementById('ImporTranspaso').value).slice(2, -3);
                                    ITP = 0;
                                }
                                else {
                                    document.getElementById('ImporTranspaso').value = (document.getElementById('ImporTranspaso').value).slice(2);
                                }

                                document.getElementById('hoy_manana').value = document.getElementById('FechaTranspaso').value;

                                $.mobile.changePage('#frmConfirmarTerceros'); return;

                            }
                        }
                    },
                    error: function (jqXHR, exception) {
                        if (jqXHR.status === 0) {
                            $.mobile.changePage('Error_Red.html');
                        } else if (exception === 'timeout') {
                            alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); return;
                        }
                    },
                    async: true
                }
            );
    }

}

////Validacion de las Cuentas a SPEI
function validarCuentasSPEI() {

    var ObtenerSerie = document.getElementById("CuenCargoSPEI").options[document.getElementById("CuenCargoSPEI").selectedIndex].text;
    var longSerie = ObtenerSerie.split(" ");
    var SerieNum = parseFloat(longSerie[3].substring(1));

    if (SerieNum < parseFloat(document.getElementById('ImporTranspasoSPEI').value)) {
        alert("No cuentas con saldo suficiente"); return;
    }

    //if (document.getElementById('ReferenciaSPEI').value.length < 18) {
    //    alert('La longitud de referencia es muy corta'); return;
    //}
    if (document.getElementById('DescriCortaSPEI').value == '' || document.getElementById('ReferenciaSPEI').value == '' || document.getElementById('CuenCargoSPEI').value == '' || document.getElementById('NombreCuentaSPEI').value == '' || document.getElementById('FechaTranspasoSPEI').value == '' || document.getElementById('ImporTranspasoSPEI').value == '') {
        alert('No deje campos vac\u00ed os, complete el formulario'); return;
    }
    else {
        var ValidaSPEI = urlws + 'Existe_CT_SPEI/Descripcion/' + document.getElementById('DescriCortaSPEI').value;

        $.ajax(
                {
                    type: "GET",
                    url: ValidaSPEI,
                    data: "{}",
                    timeout: 90000,
                    cache: false,
                    contentType: "json",
                    success: function (VSPEI) {
                        if (VSPEI == undefined) {
                            VSPEI = "-1";
                            alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); return;
                        }
                        if (VSPEI == "1") {
                            alert('Esta descripci\u00f3n ya existe!!'); return;
                        }
                        if (VSPEI == "0") {

                            //Hoy
                            if (document.getElementById('FechaTranspasoSPEI').value == '0') {
                                var fecha = new Date();
                                var fecha_hora = ('0' + fecha.getDate()).slice(-2) + '/' + ('0' + (fecha.getMonth() + 1)).slice(-2) + '/' + fecha.getFullYear() + ' ' + fecha.getHours() + ':' + ('0' + fecha.getMinutes()).slice(-2) + ':' + fecha.getSeconds();
                                document.getElementById('FechaOperacion_SPEI').value = fecha_hora;
                            }
                            //Mañana
                            if (document.getElementById('FechaTranspasoSPEI').value == '1') {
                                var fecha = new Date();
                                var fecha_hora = ('0' + (fecha.getDate() + 1)).slice(-2) + '/' + ('0' + (fecha.getMonth() + 1)).slice(-2) + '/' + fecha.getFullYear();
                                document.getElementById('FechaOperacion_SPEI').value = fecha_hora;
                            }

                            var montoEntreCuentasSPEI = "";
                            var ITP = 0;
                            montoEntreCuentasSPEI = document.getElementById('ImporTranspasoSPEI').value;
                            document.getElementById('ImporTranspasoSPEI').value = "";

                            if (montoEntreCuentasSPEI.indexOf(".") > 0) {
                                document.getElementById('ImporTranspasoSPEI').value = '$ ' + montoEntreCuentasSPEI;   //significa que si tiene decimales no se le agrega ceros
                            }
                            else {
                                document.getElementById('ImporTranspasoSPEI').value = '$ ' + montoEntreCuentasSPEI + '.00'; //significa que no tiene deciameles por eso se le agrega ceros
                                ITP = 1;
                            }

                            var CuentaCargoSelectSPEI = document.getElementById('CuenCargoSPEI').value.split("-"); // Variable Universal para obtener los Datos que trae el Select

                            document.getElementById('DesCorta_SPEI').value = document.getElementById('DescriCortaSPEI').value;
                            document.getElementById('Refer_SPEI').value = document.getElementById('ReferenciaSPEI').value;
                            document.getElementById('CuenCargo_SPEI').value = "*****" + CuentaCargoSelectSPEI[0].substring(9);
                            document.getElementById('cuentaCargoCompletaSPEI').value = CuentaCargoSelectSPEI[0]; //Esto esta oculto y lo necesitamos par aobtener completo el No de cuenta
                            document.getElementById('cuentaCargoSPEIsNProducto').value = CuentaCargoSelectSPEI[1]//Este esta oculto se necesita para obtener completo el numero de Producto
                            document.getElementById('NoCuenCargoSPEI').value = document.getElementById('no_cuenta_SPEI').value;
                            document.getElementById('NombreCuent_SPEI').value = document.getElementById("NombreCuentaSPEI").options[document.getElementById("NombreCuentaSPEI").selectedIndex].text;
                            document.getElementById('Bank_SPEI').value = document.getElementById('BancoSPEI').value;
                            document.getElementById('ImporTranspaso_SPEI').value = document.getElementById('ImporTranspasoSPEI').value;

                            if (ITP == 1) {
                                document.getElementById('ImporTranspasoSPEI').value = (document.getElementById('ImporTranspasoSPEI').value).slice(2, -3);
                                ITP = 0;
                            }
                            else {
                                document.getElementById('ImporTranspasoSPEI').value = (document.getElementById('ImporTranspasoSPEI').value).slice(2);
                            }

                            document.getElementById('hoy_manana_SPEI').value = document.getElementById('FechaTranspasoSPEI').value;

                            $.mobile.changePage('#frmConfirmarSPEI'); return;

                        }
                    },
                    error: function (jqXHR, exception) {
                        if (jqXHR.status === 0) {
                            $.mobile.changePage('Error_Red.html');
                        } else if (exception === 'timeout') {
                            alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); return;
                        }
                    },
                    async: true
                }
            );
    }

}

////validacion de los Pagos de Servicio
function validarPagoServicio() {
    var ObtenerSerie = document.getElementById("Cuenta_Cargo_Pago").options[document.getElementById("Cuenta_Cargo_Pago").selectedIndex].text;
    var longSerie = ObtenerSerie.split(" ");
    var SerieNum = parseFloat(longSerie[3].substring(1));

    if (SerieNum < parseFloat(document.getElementById('ImporTranspasoPago').value)) {
        alert("No cuentas con saldo suficiente"); return;
    }

    var context = document.getElementById('imgPagoServicioConf').getContext("2d");
    var img = new Image();
    img.src = document.getElementById('URLimagePagoServicio').value;

    img.onload = function (e) {
        context.drawImage(img, 5, 5, 100, 100);
    }

    var montoPagoServicios = "";
    var ITP = 0;
    montoPagoServicios = document.getElementById('ImporTranspasoPago').value;
    document.getElementById('ImporTranspasoPago').value = "";

    if (montoPagoServicios.indexOf(".") > 0) {
        document.getElementById('ImporTranspasoPago').value = '$ ' + montoPagoServicios;   //significa que si tiene decimales no se le agrega ceros
    }
    else {
        document.getElementById('ImporTranspasoPago').value = '$ ' + montoPagoServicios + '.00'; //significa que no tiene deciameles por eso se le agrega ceros
        ITP = 1;
    }

    var PagoSelectServicio = document.getElementById('Cuenta_Cargo_Pago').value.split("-"); // Variable Universal para obtener los Datos que trae el Select

    document.getElementById('CuentaCargoPagoXXX').value = "*****" + PagoSelectServicio[0].substring(9);
    document.getElementById('CuentaCargoPagoCompleta').value = PagoSelectServicio[0];//Esto esta oculto y lo necesitamos par aobtener completo el No de cuenta
    document.getElementById('CuentaCargoPagosNProducto').value = PagoSelectServicio[1];//Este esta oculto se necesita para obtener completo el numero de Producto
    document.getElementById('Servicio_a_Pagar').value = document.getElementById("ServicioaPagar").options[document.getElementById("ServicioaPagar").selectedIndex].text;
    document.getElementById('Referencia_de_pago').value = document.getElementById('Referencia_Pago').value;
    document.getElementById('Importe_Transpaso_de_Pago').value = document.getElementById('ImporTranspasoPago').value;

    if (ITP == 1) {
        document.getElementById('ImporTranspasoPago').value = (document.getElementById('ImporTranspasoPago').value).slice(2, -3);
        ITP = 0;
    }
    else {
        document.getElementById('ImporTranspasoPago').value = (document.getElementById('ImporTranspasoPago').value).slice(2);
    }

    if (document.getElementById('Cuenta_Cargo_Pago').value == '' || document.getElementById('ServicioaPagar').value == '' || document.getElementById('ImporTranspasoPago').value == '') {
        alert('No deje campos vac\u00edos, complete el formulario');
    }
    else {
        $.mobile.changePage('#frmConfirmarPagarServicio'); return;
    }

}

////Insertar el transpaso a la BD de Cuentas Propias        ******Momento Critico******
function insertarDatosDBCuentasPropias() {

    localStorage.setItem("waiting", 1); //Esta es la Bandera que dira si permite terminar el procesos cuando el telefono Hiberne.

    document.getElementById('LoadingImage').style.display = 'block';
    document.getElementById('LoadingImage').style.background = "#C2BBBB url('images/loader.gif') no-repeat center";

    var fecha = new Date();
    var fecha_hora = ('0' + fecha.getDate()).slice(-2) + '-' + ('0' + (fecha.getMonth() + 1)).slice(-2) + '-' + fecha.getFullYear() + ' ' + fecha.getHours() + '-' + ('0' + fecha.getMinutes()).slice(-2) + '-' + fecha.getSeconds();

    var num_cliente = localStorage.getItem("CLIENTE");
    var producto = document.getElementById('Cuenta_Cargo_Propias_SnProducto').value;
    var concepto = document.getElementById('DescripCorta_').value;
    //document.getElementById('Reference_').value;
    var cuenta_origen = document.getElementById('Cuenta_Cargo_Completa_Propias').value;
    var cuenta_destino = document.getElementById('Cuenta_Deposito_Completa').value;
    var monto = document.getElementById('ImporteTranspaso').value;

    var CCopia = "-";
    var asunto = "Traspaso entre Cuentas Propias";
    var id = "138";
    var mensaje = cuenta_origen + '@' + concepto + '@' + fecha_hora + '@' + monto + '@' + cuenta_destino;

    //alert(num_cliente + ' ' + cuenta_origen + ' ' + cuenta_destino + ' ' + monto);
                                    
    var DBCuentasPropias = urlws + 'HB_Traspaso/user/HOBA/cve/HOBA123/nocliente/' + num_cliente + '/producto/' + producto + '/ctaOrigen/' + cuenta_origen + '/ctaDestino/' + cuenta_destino + '/monto/' + monto + '/cargo/0/concepto/' + concepto+'/referencia/'+'1234567';
    
    $.ajax(
            {
                type: "GET",
                url: DBCuentasPropias,
                data: "{}",
                timeout: 90000,
                cache: false,
                contentType: "json",
                success: function (DBRegresoPropias) {
                   
                    if (DBRegresoPropias == undefined) {
                        
                        document.getElementById('LoadingImage').style.display = 'none';
                        DBRegresoPropias = "-1";
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); return;
                    }
                    else {
                        
                        //alert(DBRegresoPropias);
                        if ($(DBRegresoPropias).find("status").text().substring(4) == '0') {
                            
                            document.getElementById('LoadingImage').style.display = 'none';
                            alert('No se realiz\u00f3  ning\u00fan traspaso');
                            localStorage.setItem("waiting", 0);
                            $.mobile.changePage('BancaMovil.html');
                        }
                        if ($(DBRegresoPropias).find("StatusTrn").text().substring(4) == '0') {
                            
                            document.getElementById('LoadingImage').style.display = 'none';
                            alert('Traspaso realizado exitosamente');
                            Enviar_Correo_Cliente(num_cliente, CCopia, asunto, id, mensaje);
                            localStorage.setItem("waiting", 0);
                            $.mobile.changePage('BancaMovil.html');
                        }
                        if ($(DBRegresoPropias).find("status").text().substring(4) == '5') {
                           
                            document.getElementById('LoadingImage').style.display = 'none';
                            alert('No cuenta con saldo suficiente');
                            localStorage.setItem("waiting", 0);
                            $.mobile.changePage('BancaMovil.html');
                        } else {
                            
                            document.getElementById('LoadingImage').style.display = 'none';
                            alert('Traspaso realizado exitosamente');
                            Enviar_Correo_Cliente(num_cliente, CCopia, asunto, id, mensaje);
                            localStorage.setItem("waiting", 0);
                            $.mobile.changePage('BancaMovil.html');
                        }
                    }
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        localStorage.setItem("waiting", 0);
                        alert('A ocurrido un error de red; intente de nuevo, o m\u00e1s tarde'); return;
                    } else if (exception === 'timeout') {
                        document.getElementById('LoadingImage').style.display = 'none';
                        localStorage.setItem("waiting", 0);
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); return;
                    }
                },
                async: true
            }
        );
}

////Insertar el transpaso a la BD de Cuentas Terceros       ******Momento Critico******
function insertarDatosDBCuentasTerceros() {

    localStorage.setItem("waiting", 1); //Esta es la Bandera que dira si permite terminar el procesos cuando el telefono Hiberne.

    document.getElementById('LoadingImage').style.display = 'block';
    document.getElementById('LoadingImage').style.background = "#C2BBBB url('images/loader.gif') no-repeat center";
    var correo_electronico = "";

    if (document.getElementById('AgregarFavoritosTerceros').value == '') {
        var favorito = '0';
    }
    if (document.getElementById('AgregarFavoritosTerceros').value != '') {
        var favorito = document.getElementById('AgregarFavoritosTerceros').value;
    }

    var filter = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;

    if (document.getElementById('CorreoElectroTerceros1').value == "" && document.getElementById('CorreoElectroTerceros2').value == "") {
        correo_electronico = "";
    } else {
        if (filter.test($.trim($("#CorreoElectroTerceros1").val() + "@" + $("#CorreoElectroTerceros2").val())))
        { correo_electronico = (document.getElementById('CorreoElectroTerceros1').value + "@" + document.getElementById('CorreoElectroTerceros2').value).trim(); }
        else { alert('Ingrese un Correo Valido'); document.getElementById('LoadingImage').style.display = 'none'; return; }
    }


    var num_cliente = localStorage.getItem("CLIENTE");
    var concepto = document.getElementById('DesCorta_').value;
    var producto = document.getElementById('cuentaCargoTercerosNProducto').value;
    //document.getElementById('Refer_').value;
    var cuenta_origen = document.getElementById('cuentaCargoCompletaTerceros').value;
    var cuenta_destino = document.getElementById('NoCuenCargo').value;
    var monto = document.getElementById('ImporTranspaso').value;
    var fecha_operacion = document.getElementById('FechaOperacion_').value;
    var date_hora = fecha_operacion; date_hora = date_hora.replace("/", "-"); date_hora = date_hora.replace("/", "-"); date_hora = date_hora.replace(":", "-"); date_hora = date_hora.replace(":", "-");

    var CCopia = "-";
    var asunto = "Traspaso A Cuentas a Terceros";
    var id = "138";
    var mensaje = cuenta_origen + '@' + concepto + '@' + date_hora + '@' + monto + '@' + cuenta_destino;


    var hoy_manana = document.getElementById('hoy_manana').value;

    var cargo = 0;

    //Hoy
    if (hoy_manana == 0) {
        cargo = monto * 0.02;
    }
    //Mañana
    if (hoy_manana == 1) {
        cargo = 0;
    }
    //alert(parseFloat(cargo).toFixed(2));
    
    
    cargo = parseFloat(cargo).toFixed(2);

    //alert(cargo);

    //alert(num_cliente + ' ' + cuenta_origen + ' ' + cuenta_destino + ' ' + monto + ' ' + cargo + ' ' + favorito + ' ' + fecha_operacion + ' ' + correo_electronico);

    var DBCuentasTerceros = urlws + 'HB_Traspaso_TercerMismo/user/HOBA/cve/HOBA123/nocliente/' + num_cliente + '/producto/' + producto + '/ctaOrigen/' + cuenta_origen + '/ctaDestino/' + cuenta_destino + '/monto/' + monto + '/cargo/' + cargo + '/concepto/' + concepto + '/referencia/' + '1234567';
    //alert(DBCuentasTerceros);
    $.ajax(
            {
                type: "GET",
                url: DBCuentasTerceros,
                data: "{}",
                timeout: 90000,
                cache: false,
                contentType: "json",
                success: function (DBRegresoTerceros) {
                    if (DBRegresoTerceros == undefined) {

                        document.getElementById('LoadingImage').style.display = 'none';
                        DBRegresoTerceros = "-1";
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); return;
                    }
                    else {

                        //alert(DBRegresoPropias);
                        if ($(DBRegresoTerceros).find("status").text().substring(4) == '0') {

                            document.getElementById('LoadingImage').style.display = 'none';
                            alert('No se realiz\u00f3  ning\u00fan traspaso');
                            localStorage.setItem("waiting", 0);
                            $.mobile.changePage('BancaMovil.html');
                        }
                        if ($(DBRegresoTerceros).find("StatusTrn").text().substring(4) == '0') {

                            document.getElementById('LoadingImage').style.display = 'none';
                            alert('Traspaso realizado exitosamente');
                            Enviar_Correo_Cliente(num_cliente, CCopia, asunto, id, mensaje);
                            localStorage.setItem("waiting", 0);
                            $.mobile.changePage('BancaMovil.html');
                        }
                        if ($(DBRegresoTerceros).find("status").text().substring(4) == '5') {

                            document.getElementById('LoadingImage').style.display = 'none';
                            alert('No cuenta con saldo suficiente');
                            localStorage.setItem("waiting", 0);
                            $.mobile.changePage('BancaMovil.html');
                        } else {

                            document.getElementById('LoadingImage').style.display = 'none';
                            alert('Traspaso realizado exitosamente');
                            Enviar_Correo_Cliente(num_cliente, CCopia, asunto, id, mensaje);
                            localStorage.setItem("waiting", 0);
                            $.mobile.changePage('BancaMovil.html');
                        }
                    }
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        localStorage.setItem("waiting", 0);
                        alert('A ocurrido un error de red; intente de nuevo, o m\u00e1s tarde'); return;
                    } else if (exception === 'timeout') {
                        document.getElementById('LoadingImage').style.display = 'none';
                        localStorage.setItem("waiting", 0);
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); return;
                    }
                },
                async: true
            }
        );
}

function insertarFavoritos(descripcion, cuenta, cliente, favorito) {

    var InsertFavoritos = urlws + 'Agrega_Favoritos/descripcion/' + descripcion + '/noCuenta/' + cuenta + '/noCliente/' + cliente + '/favoritos/' + favorito;

    $.ajax(
            {
                type: "GET",
                url: InsertFavoritos,
                data: "{}",
                timeout: 90000,
                cache: false,
                contentType: "json",
                success: function (newFavoritos) {
                    if (newFavoritos == undefined) {
                        alert("La transacci\u00f3n se realiz\u00f3; pero no fue posible agregarla a favoritos"); return;
                        newFavoritos = "-1";
                    }
                    else {
                        if (newFavoritos == "1") {
                            return;
                            //Ingresado Correctamente
                        }
                        else {
                            alert("La transacci\u00f3n se realiz\u00f3; pero no fue posible agregarla a favoritos"); return;
                        }
                    }
                },
                async: true
            }
        );
}

function insertarFavoritos_PagoServicios(descripcion, id_cliente, ref_numerica, favorito) {

    var InsertFavoritosPS = urlws + 'Agrega_Favoritos_Pago_Servicio/descripcion/' + descripcion + '/id_cliente/' + id_cliente + '/ref_numerica/' + ref_numerica + '/favoritos/' + favorito;

    $.ajax(
            {
                type: "GET",
                url: InsertFavoritosPS,
                data: "{}",
                timeout: 90000,
                cache: false,
                contentType: "json",
                success: function (newFavoritosPS) {
                    if (newFavoritosPS == undefined) {
                        alert("La transacci\u00f3n se realiz\u00f3; pero no fue posible agregarla a favoritos"); return;
                        newFavoritosPS = "-1";
                    }
                    else {
                        if (newFavoritosPS == "1") {
                            return;
                            //Ingresado Correatamente
                        }
                        else {
                            alert("La transacci\u00f3n se realiz\u00f3; pero no fue posible agregarla a favoritos"); return;
                        }
                    }
                },
                async: true
            }
        );
}

////Insertar el transpaso a la BD de Cuentas SPEI           ******Momento Critico******
function insertarDatosDBCuentasSPEI() {

    localStorage.setItem("waiting", 1); //Esta es la Bandera que dira si permite terminar el procesos cuando el telefono Hiberne.

    document.getElementById('LoadingImage').style.display = 'block';
    document.getElementById('LoadingImage').style.background = "#C2BBBB url('images/loader.gif') no-repeat center";
    var correo_electronico = "";

    if (document.getElementById('AgregarFavoritosSPEI').value == '') {
        var favorito = '0';
    }
    if (document.getElementById('AgregarFavoritosSPEI').value != '') {
        var favorito = document.getElementById('AgregarFavoritosSPEI').value;
    }

    var filter = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;

    if (document.getElementById('CorreoElectroSPEI1').value == "" && document.getElementById('CorreoElectroSPEI2').value == "") {
        correo_electronico = "";
    } else {
        if (filter.test($.trim($("#CorreoElectroSPEI1").val() + "@" + $("#CorreoElectroSPEI2").val())))
        { correo_electronico = (document.getElementById('CorreoElectroSPEI1').value + "@" + document.getElementById('CorreoElectroSPEI2').value).trim(); }
        else { alert('Ingrese un Correo Valido'); document.getElementById('LoadingImage').style.display = 'none'; return; }
    }


    var num_cliente = localStorage.getItem("CLIENTE");
    var concepto = document.getElementById('DesCorta_SPEI').value;
    var producto = document.getElementById('cuentaCargoSPEIsNProducto').value
    //document.getElementById('Refer_SPEI').value;
    var cuenta_origen = document.getElementById('cuentaCargoCompletaSPEI').value;
    var cuenta_destino = document.getElementById('NoCuenCargoSPEI').value;
    var monto = document.getElementById('ImporTranspasoSPEI').value;
    var fecha_operacion = document.getElementById('FechaOperacion_SPEI').value;
    var idbanco = document.getElementById('IDBancoSPEI').value;
    var date_hora = fecha_operacion; date_hora = date_hora.replace("/", "-"); date_hora = date_hora.replace("/", "-"); date_hora = date_hora.replace(":", "-"); date_hora = date_hora.replace(":", "-");

    var CCopia = "-";
    var asunto = "Traspaso por Cuentas SPEI";
    var id = "138";
    var mensaje = cuenta_origen + '@' + concepto + '@' + date_hora + '@' + monto + '@' + cuenta_destino;


    var hoy_manana = document.getElementById('hoy_manana_SPEI').value;

    var cargo = 0;

    //Hoy
    if (hoy_manana == 0) {
        cargo = monto * 0.02;
    }
    //Mañana
    if (hoy_manana == 1) {
        cargo = 0;
    }

    cargo = parseFloat(cargo).toFixed(2);
    //alert(num_cliente + ' ' + cuenta_origen + ' ' + cuenta_destino + ' ' + monto + ' ' + cargo + ' ' + banco + ' ' + favorito + ' ' + fecha_operacion + ' ' + correo_electronico);

    var DBCuentasSPEI = urlws + 'HB_Traspaso_SPEI/user/HOBA/cve/HOBA123/nocliente/' + num_cliente + '/producto/' + producto + '/ctaOrigen/' + cuenta_origen + '/ctaDestino/70001000113/monto/' + monto + '/cargo/' + cargo +'/concepto/' + concepto + '/referencia/' + '1234567';
    //alert(DBCuentasSPEI);
    $.ajax(
            {
                type: "GET",
                url: DBCuentasSPEI,
                data: "{}",
                timeout: 90000,
                cache: false,
                contentType: "json",
                success: function (DBRegresoSPEI) {
                    if (DBRegresoSPEI == undefined) {

                        document.getElementById('LoadingImage').style.display = 'none';
                        DBRegresoSPEI = "-1";
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); return;
                    }
                    else {

                        //alert(DBRegresoPropias);
                        if ($(DBRegresoSPEI).find("status").text().substring(4) == '0') {

                            document.getElementById('LoadingImage').style.display = 'none';
                            alert('No se realiz\u00f3  ning\u00fan traspaso');
                            localStorage.setItem("waiting", 0);
                            $.mobile.changePage('BancaMovil.html');
                        }
                        if ($(DBRegresoSPEI).find("StatusTrn").text().substring(4) == '0') {

                            document.getElementById('LoadingImage').style.display = 'none';
                            alert('Traspaso realizado exitosamente');
                            Enviar_Correo_Cliente(num_cliente, CCopia, asunto, id, mensaje);
                            localStorage.setItem("waiting", 0);
                            $.mobile.changePage('BancaMovil.html');
                        }
                        if ($(DBRegresoSPEI).find("status").text().substring(4) == '5') {

                            document.getElementById('LoadingImage').style.display = 'none';
                            alert('No cuenta con saldo suficiente');
                            localStorage.setItem("waiting", 0);
                            $.mobile.changePage('BancaMovil.html');
                        } else {

                            document.getElementById('LoadingImage').style.display = 'none';
                            alert('Traspaso realizado exitosamente');
                            Enviar_Correo_Cliente(num_cliente, CCopia, asunto, id, mensaje);
                            localStorage.setItem("waiting", 0);
                            $.mobile.changePage('BancaMovil.html');
                        }
                    }
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        localStorage.setItem("waiting", 0);
                        alert('A ocurrido un error de red; intente de nuevo, o m\u00e1s tarde'); return;
                    } else if (exception === 'timeout') {
                        document.getElementById('LoadingImage').style.display = 'none';
                        localStorage.setItem("waiting", 0);
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); return;
                    }
                },
                async: true
            }
        );
}

////Insertar el transpaso a la BD de Nuevo Pago Servicio        ******Momento Critico******
function insertarDatosDBPagoServicio() {
   
    localStorage.setItem("waiting", 1); //Esta es la Bandera que dira si permite terminar el procesos cuando el telefono Hiberne.

    document.getElementById('LoadingImage').style.display = 'block';
    document.getElementById('LoadingImage').style.background = "#C2BBBB url('images/loader.gif') no-repeat center";

    var fecha = new Date();
    var fecha_hora = ('0' + fecha.getDate()).slice(-2) + '-' + ('0' + (fecha.getMonth() + 1)).slice(-2) + '-' + fecha.getFullYear() + ' ' + fecha.getHours() + '-' + ('0' + fecha.getMinutes()).slice(-2) + '-' + fecha.getSeconds();

    if (document.getElementById('AgregarFavoritoServicios').value == '') {
        var favorito = '0';
    }
    if (document.getElementById('AgregarFavoritoServicios').value != '') {
        var favorito = document.getElementById('AgregarFavoritoServicios').value;
    }
  
    var num_cliente = localStorage.getItem("CLIENTE");
    var producto = document.getElementById('CuentaCargoPagosNProducto').value;
    var ctaOrigen = document.getElementById('CuentaCargoPagoCompleta').value;
    var ctaDestino = "70001000112";
    var referencia = document.getElementById('Referencia_de_pago').value;
    var monto = document.getElementById('ImporTranspasoPago').value;
    var cargo = "0";
    var concepto = document.getElementById('Servicio_a_Pagar').value;
    var descripcion = document.getElementById('Servicio_a_Pagar').value;
    
    ////Esto va para lo del Envio de Correo
    var CCopia = "-";
    var asunto = "Pago de Servicio";
    var id = "138";
    var mensaje = ctaOrigen + '@' + concepto + '@' + fecha_hora + '@' + monto + '@' + referencia;
  

   
    var DBCuentasPropias = urlws + 'HB_Traspaso_Pago/user/HOBA/cve/HOBA123/nocliente/' + num_cliente + '/producto/' + producto + '/ctaOrigen/' + ctaOrigen + '/ctaDestino/70001000112/monto/' + monto + '/cargo/0/concepto/' + concepto + '/referencia/' + referencia;

    $.ajax(
            {
                type: "GET",
                url: DBCuentasPropias,
                data: "{}",
                timeout: 90000,
                cache: false,
                contentType: "json",
                success: function (DBRegresoTerceros) {
                    if (DBRegresoTerceros == undefined) {

                        document.getElementById('LoadingImage').style.display = 'none';
                        DBRegresoTerceros = "-1";
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); return;
                    }
                    else {

                        //alert(DBRegresoPropias);
                        if ($(DBRegresoTerceros).find("status").text().substring(4) == '0') {

                            document.getElementById('LoadingImage').style.display = 'none';
                            alert('No se realiz\u00f3  ning\u00fan pago');
                            localStorage.setItem("waiting", 0);
                            $.mobile.changePage('BancaMovil.html');
                        }
                        if ($(DBRegresoTerceros).find("StatusTrn").text().substring(4) == '0') {

                            document.getElementById('LoadingImage').style.display = 'none';
                            alert('Pago realizado exitosamente');
                            Enviar_Correo_Cliente(num_cliente, CCopia, asunto, id, mensaje);
                            localStorage.setItem("waiting", 0);
                            $.mobile.changePage('BancaMovil.html');
                        }
                        if ($(DBRegresoTerceros).find("status").text().substring(4) == '5') {

                            document.getElementById('LoadingImage').style.display = 'none';
                            alert('No cuenta con saldo suficiente');
                            localStorage.setItem("waiting", 0);
                            $.mobile.changePage('BancaMovil.html');
                        } else {

                            document.getElementById('LoadingImage').style.display = 'none';
                            alert('Pago realizado exitosamente');
                            Enviar_Correo_Cliente(num_cliente, CCopia, asunto, id, mensaje);
                            localStorage.setItem("waiting", 0);
                            $.mobile.changePage('BancaMovil.html');
                        }
                    }
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        localStorage.setItem("waiting", 0);
                        alert('A ocurrido un error de red; intente de nuevo, o m\u00e1s tarde'); return;
                    } else if (exception === 'timeout') {
                        document.getElementById('LoadingImage').style.display = 'none';
                        localStorage.setItem("waiting", 0);
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); return;
                    }
                },
                async: true
            }
        );

}


function compraCEDEWS(ctaOrigen,idProducto,idPlazo,idPeriodicidad,idInstruccion,importe,idMoneda) {

   // localStorage.setItem("waiting", 1); //Esta es la Bandera que dira si permite terminar el procesos cuando el telefono Hiberne.

    //document.getElementById('LoadingImage').style.display = 'block';
    //document.getElementById('LoadingImage').style.background = "#C2BBBB url('images/loader.gif') no-repeat center";

    //var fecha = new Date();
    //var fecha_hora = ('0' + fecha.getDate()).slice(-2) + '-' + ('0' + (fecha.getMonth() + 1)).slice(-2) + '-' + fecha.getFullYear() + ' ' + fecha.getHours() + '-' + ('0' + fecha.getMinutes()).slice(-2) + '-' + fecha.getSeconds();


    //var srtUrlx = urlws + 'HB_Traspaso_Pago/user/HOBA/cve/HOBA123/nocliente/' + num_cliente + '/producto/' + producto + '/ctaOrigen/' + ctaOrigen + '/ctaDestino/70001000112/monto/' + monto + '/cargo/0/concepto/' + concepto + '/referencia/' + referencia;
    var srtUrl = urlws + 'HB_COMPRA_CEDE/ctaOrigen/' + ctaOrigen + '/idProducto/' + idProducto + '/idPlazo/' + idPlazo + '/idPeriodicidad/' + idPeriodicidad + '/idInstruccion/' + idInstruccion + '/importe/' + importe + '/idMoneda/'+idMoneda;
    console.log(srtUrl);
    $.ajax(
            {
                type: "GET",
                url: srtUrl,
                data: "{}",
                timeout: 90000,
                cache: false,
                contentType: "json",
                success: function (DBRegresoTerceros) {
                    if (DBRegresoTerceros == undefined) {

                        document.getElementById('LoadingImage').style.display = 'none';
                        DBRegresoTerceros = "-1";
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); return;
                    }

                    //alert(DBRegresoTerceros);
                    messageBox('dummy()', DBRegresoTerceros, 'Stefanini');
                    //else {

                        //alert(DBRegresoPropias);
                        
                       
                         //{

                         //   document.getElementById('LoadingImage').style.display = 'none';
                         //   alert('Pago realizado exitosamente');
                         //   Enviar_Correo_Cliente(num_cliente, CCopia, asunto, id, mensaje);
                         //   localStorage.setItem("waiting", 0);
                         //   $.mobile.changePage('BancaMovil.html');
                        //}
                    //}
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        //document.getElementById('LoadingImage').style.display = 'none';
                        //localStorage.setItem("waiting", 0);
                        alert('A ocurrido un error de red; intente de nuevo, o m\u00e1s tarde'); return;
                    } else if (exception === 'timeout') {
                        //document.getElementById('LoadingImage').style.display = 'none';
                        //localStorage.setItem("waiting", 0);
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); return;
                    }
                },
                async: true
            }
        );

}

////Funciones de validaciones
function obtenerCuentaComboxTerceros() {

    document.getElementById('no_cuenta').value = "";

    if (document.getElementById('NombreCuenta').value != "" && document.getElementById('NombreCuenta').value != "new") {
        document.getElementById('no_cuenta').value = document.getElementById('NombreCuenta').value;
    }
    if (document.getElementById('NombreCuenta').value == "new") {
        document.getElementById('no_cuenta').value = "";
        $.mobile.changePage('#frmNuevaCuentaTerceros');
    }
}
function obtenerCuentaComboxSPEI() {

    document.getElementById('BancoSPEI').value = "";
    document.getElementById('IDBancoSPEI').value = "";
    document.getElementById('no_cuenta_SPEI').value = "";

    if (document.getElementById('NombreCuentaSPEI').value != "" && document.getElementById('NombreCuentaSPEI').value != "new") {
        var cadena_acortar = document.getElementById('NombreCuentaSPEI').value.split("-");
        document.getElementById('no_cuenta_SPEI').value = cadena_acortar[0];
        document.getElementById('BancoSPEI').value = cadena_acortar[1];
        document.getElementById('IDBancoSPEI').value = cadena_acortar[2];
    }
    if (document.getElementById('NombreCuentaSPEI').value == "new") {
        document.getElementById('no_cuenta_SPEI').value = "";
        document.getElementById('BancoSPEI').value = "";
        getAllBank();
        $.mobile.changePage('#frmNuevaCuentaSPEI');
    }

}
function obtenerCuentaComboxPagoServicio() {

    document.getElementById('Referencia_Pago').value = "";

    var context = document.getElementById('imgPagoServicio').getContext("2d");
    var img = new Image();
    img.src = "images/Servicios/servicios.jpg";

    img.onload = function (e) {
        context.drawImage(img, 5, 5, 115, 115);
    }

    if (document.getElementById('ServicioaPagar').value == "new") {
        document.getElementById('Referencia_Pago').value = "";
        getAllService();
        $.mobile.changePage('#frmNuevoPagarServicio');
    }

    if (document.getElementById('ServicioaPagar').value != "" && document.getElementById('ServicioaPagar').value != "new") {
        var cadena_cortar_Servicios = document.getElementById('ServicioaPagar').value.split("-");
        document.getElementById('Referencia_Pago').value = cadena_cortar_Servicios[0];

        var context = document.getElementById('imgPagoServicio').getContext("2d");
        var img = new Image();
        img.src = "images" + cadena_cortar_Servicios[2].slice(15);

        img.onload = function (e) {
            context.drawImage(img, 5, 5, 115, 115);
        }

        document.getElementById('URLimagePagoServicio').value = "images" + cadena_cortar_Servicios[2].slice(15);
    }

}
function obtenerCuentaComboxPagoServicioNEW() {
    var context = document.getElementById('imgPagoServicioNew').getContext("2d");
    var img = new Image();
    img.src = "images/Servicios/servicios.jpg";
    img.onload = function (e) {
        context.drawImage(img, 5, 5, 115, 115);
    }

    if (document.getElementById('ServicioSelectNew').value != "") {

        var cadena_cortar_Servicios = document.getElementById('ServicioSelectNew').value.split("-");

        var context = document.getElementById('imgPagoServicioNew').getContext("2d");
        var img = new Image();
        img.src = "images" + cadena_cortar_Servicios[1].slice(15);

        img.onload = function (e) {
            context.drawImage(img, 5, 5, 115, 115);
        }

        document.getElementById('URLimagePagoServicioNew').value = "images" + cadena_cortar_Servicios[1].slice(15);
    }


}
function validarSiNumeroPropias(numero) {
    if (!/^[0-9]+(\.([0-9]{1,2})?)?$/.test(numero)) {
        document.getElementById('ImporteTranspaso').value = null;
    }
}
function validarSiNumeroTerceros(numero) {
    if (!/^[0-9]+(\.([0-9]{1,2})?)?$/.test(numero)) {
        document.getElementById('ImporTranspaso').value = null;
    }
}
function validarSiNumeroTercerosNEW(numero) {

    if (!/^[0-9]+(\.([0-9]{1,2})?)?$/.test(numero)) {
        document.getElementById('NumeroCuentaT').value = null;
    }

    if (document.getElementById('NumeroCuentaT').value.length <= 0) {
        document.getElementById('NombreBeneficiarioT').value = "";
        document.getElementById("NombreBeneficiarioT").value = "";
        document.getElementById("idBankT").value = "";
        document.getElementById("nameBankT").value = "";
        document.getElementById("nombre_existeT").value = "";
    }

}
function validarSiNumeroSPEI(numero) {
    if (!/^[0-9]+(\.([0-9]{1,2})?)?$/.test(numero)) {
        document.getElementById('ImporTranspasoSPEI').value = null;
    }
}
function validarSiNumeroSPEINEW(numero) {

    if (!/^[0-9]+(\.([0-9]{1,2})?)?$/.test(numero)) {
        document.getElementById('NumeroCuentaS').value = null;
    }
}
function validarSiNumeroPagosServicios(numero) {
    if (!/^[0-9]+(\.([0-9]{1,2})?)?$/.test(numero)) {
        document.getElementById('ImporTranspasoPago').value = null;
    }
}
function validarSiNumeroTelefonico(numero) {
    if (!/^[0-9]+(\.([0-9]{1,2})?)?$/.test(numero)) {
        document.getElementById('numTelefono').value = null;
    }
}

////Obtener las Cuentas par mandarlos a los combo-box de Cuentas Propias
function getEntreCuentasPropias() {

    document.getElementById('LoadingImage').style.display = 'block';
    document.getElementById('LoadingImage').style.background = "#C2BBBB url('images/loader.gif') no-repeat center";

    var comodin = "";
    var comodin = document.getElementById('n.cuenta.popup').value;
    //document.getElementById('n.cuenta.popup').value = "";
    //alert(comodin);

    var cliente = localStorage.getItem("CLIENTE");
    var GET_CUENTASS = urlws + 'GET_CUENTAS/nocliente/' + cliente + '/producto/2';
    //alert(GET_CUENTASS);
    $.ajax(
            {
                type: "GET",
                url: GET_CUENTASS,
                data: "{}",
                timeout: 90000,
                cache: false,
                contentType: "json",
                success: function (cuentasPropiasObtenidas) {

                    document.getElementById('LoadingImage').style.display = 'none';

                    //aqui creamos el select
                    document.getElementById("divSel_cuentasPropias_1").innerHTML = "";
                    var myDiv = document.getElementById("divSel_cuentasPropias_1");
                    var selectList = document.createElement("select");
                    selectList.style.width = "600px";
                    selectList.id = "CuentaCargo";
                    selectList.onchange = function () { changeEntreCuentasPropias(); };
                    myDiv.appendChild(selectList);

                    var option = document.createElement("option");
                    option.value = "";
                    option.text = "Seleccione la cuenta de cargo";
                    //option.selected = "selected";
                    selectList.appendChild(option);

                    //Con esto no perdemos el stilo, aseguramos que siempre este activo el Data Mini =  true
                    $('select').selectmenu({ mini: true });

                    for (var e1 = 0; e1 < cuentasPropiasObtenidas.length; e1++) {

                        //aqui pintamos el select
                        var option = document.createElement("option");
                        option.value = cuentasPropiasObtenidas[e1].noCuenta + "-" + cuentasPropiasObtenidas[e1].sNProducto;
                        option.text = "*****" + (cuentasPropiasObtenidas[e1].noCuenta).substring(9) + " - Saldo: " + cuentasPropiasObtenidas[e1].cSaldo + " - Cuenta: " + cuentasPropiasObtenidas[e1].sSTipo;
                        if (cuentasPropiasObtenidas[e1].noCuenta == comodin) {
                            option.selected = "selected";
                        }
                        selectList.appendChild(option);


                    } $('#CuentaCargo').selectmenu('refresh');

                    if (comodin == "") {
                        //aqui creamos el segundo select
                        document.getElementById("divSel_cuentasPropias_2").innerHTML = "";
                        var myDiv1 = document.getElementById("divSel_cuentasPropias_2");
                        var selectList1 = document.createElement("select");
                        selectList1.style.width = "600px";
                        selectList1.id = "CuentaDeposito";
                        myDiv1.appendChild(selectList1);

                        var option1 = document.createElement("option");
                        option1.value = "";
                        option1.text = "Seleccione la cuenta de deposito";
                        option1.selected = "selected";
                        selectList1.appendChild(option1);
                        $('select').selectmenu({ mini: true });
                    }

                    return;
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        $.mobile.changePage('Error_Red.html');
                    } else if (exception === 'timeout') {
                        document.getElementById('LoadingImage').style.display = 'none';
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                    }
                },
                async: false
            }
        );
}
function changeEntreCuentasPropias() {

    document.getElementById('LoadingImage').style.display = 'block';
    document.getElementById('LoadingImage').style.background = "#C2BBBB url('images/loader.gif') no-repeat center";

    var comodin = "";
    var comodin = document.getElementById('n.cuenta.popup').value;
    document.getElementById('n.cuenta.popup').value = "";

    var cliente = localStorage.getItem("CLIENTE");
    var GET_CUENTASS = urlws + 'GET_CUENTAS/nocliente/' + cliente + '/producto/2';

    $.ajax(
            {
                type: "GET",
                url: GET_CUENTASS,
                data: "{}",
                timeout: 90000,
                cache: false,
                contentType: "json",
                success: function (cuentasPropiasObtenidas) {

                    //aqui creamos el select
                    document.getElementById("divSel_cuentasPropias_2").innerHTML = "";
                    var myDiv2 = document.getElementById("divSel_cuentasPropias_2");
                    var selectList2 = document.createElement("select");
                    selectList2.style.width = "600px";
                    selectList2.id = "CuentaDeposito";
                    myDiv2.appendChild(selectList2);

                    var option2 = document.createElement("option");
                    option2.value = "";
                    option2.text = "Seleccione la cuenta de dep&oacute;sito";
                    //option2.selected = "selected";
                    selectList2.appendChild(option2);

                    //Con esto no perdemos el stilo, aseguramos que siempre este activo el Data Mini =  true
                    $('select').selectmenu({ mini: true });

                    for (var e2 = 0; e2 < cuentasPropiasObtenidas.length; e2++) {

                        //aqui pintamos el select
                        var option2 = document.createElement("option");
                        option2.value = cuentasPropiasObtenidas[e2].noCuenta;
                        option2.text = "*****" + (cuentasPropiasObtenidas[e2].noCuenta).substring(9) + " - Saldo: " + cuentasPropiasObtenidas[e2].cSaldo + " - Cuenta: " + cuentasPropiasObtenidas[e2].sSTipo;
                        selectList2.appendChild(option2);

                    }

                    if (comodin != "" || document.getElementById('CuentaCargo').selectedIndex != "") {
                        document.getElementById('CuentaDeposito').remove(document.getElementById('CuentaCargo').selectedIndex);
                        $('#CuentaDeposito').selectmenu('refresh');
                    } else {
                        $('#CuentaDeposito')[0].options.length = 0;
                        document.getElementById('CuentaDeposito').options.add(new Option('Seleccione la cuenta de deposito', ''));
                    }

                    document.getElementById('LoadingImage').style.display = 'none';
                    return;
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        $.mobile.changePage('Error_Red.html');
                    } else if (exception === 'timeout') {
                        document.getElementById('LoadingImage').style.display = 'none';
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                    }
                },
                async: true
            }
        );
}

////Obtener las Cuentas par mandarlos a los combo-box de Cuentas terceros
function getCuentasTerceros_Cuenta() {

    document.getElementById('LoadingImage').style.display = 'block';
    document.getElementById('LoadingImage').style.background = "#C2BBBB url('images/loader.gif') no-repeat center";

    var comodin = "";
    var comodin = document.getElementById('n.cuenta.popup').value;
    document.getElementById('n.cuenta.popup').value = "";

    var cliente = localStorage.getItem("CLIENTE");
    var GET_TOKEN = urlws + 'GET_CUENTAS/nocliente/' + cliente + '/producto/2';

    $.ajax(
            {
                type: "GET",
                url: GET_TOKEN,
                data: "{}",
                timeout: 90000,
                cache: false,
                contentType: "json",
                success: function (cuentasTercerosObtenidas) {

                    //aqui creamos el select
                    document.getElementById("divSel_cuentasTerceros_1").innerHTML = "";
                    var myDiv = document.getElementById("divSel_cuentasTerceros_1");
                    var selectList = document.createElement("select");
                    selectList.style.width = "600px";
                    selectList.id = "CuenCargo";
                    myDiv.appendChild(selectList);

                    var option = document.createElement("option");
                    option.value = "";
                    option.text = "Seleccione la cuenta de cargo";
                    //option.selected = "selected";
                    selectList.appendChild(option);

                    //Con esto no perdemos el stilo, aseguramos que siempre este activo el Data Mini =  true
                    $('select').selectmenu({ mini: true });

                    for (var e1 = 0; e1 < cuentasTercerosObtenidas.length; e1++) {

                        //aqui pintamos el select
                        var option = document.createElement("option");
                        option.value = cuentasTercerosObtenidas[e1].noCuenta + "-" + cuentasTercerosObtenidas[e1].sNProducto;
                        option.text = "*****" + (cuentasTercerosObtenidas[e1].noCuenta).substring(9) + " - Saldo: " + cuentasTercerosObtenidas[e1].cSaldo + " - Cuenta: " + cuentasTercerosObtenidas[e1].sSTipo;
                        if (cuentasTercerosObtenidas[e1].noCuenta == comodin) {
                            option.selected = "selected";
                        }
                        selectList.appendChild(option);

                    } $('#CuenCargo').selectmenu('refresh');

                    document.getElementById('LoadingImage').style.display = 'none';
                    return;
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        $.mobile.changePage('Error_Red.html');
                    } else if (exception === 'timeout') {
                        document.getElementById('LoadingImage').style.display = 'none';
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                    }
                },
                async: false
            }
        );

}

function getCuentasTerceros_Nombre() {

    document.getElementById('LoadingImage').style.display = 'block';
    document.getElementById('LoadingImage').style.background = "#C2BBBB url('images/loader.gif') no-repeat center";

    var cliente = localStorage.getItem("CLIENTE");
    var GET_TOKEN = urlws + 'NOMBRE_CUENTAS/nocliente/' + cliente;

    $.ajax(
            {
                type: "GET",
                url: GET_TOKEN,
                data: "{}",
                timeout: 90000,
                cache: false,
                contentType: "json",
                success: function (cuentasTercerosObtenidas1) {

                    //aqui creamos el select
                    document.getElementById("divSel_cuentasTerceros_2").innerHTML = "";
                    var myDiv2 = document.getElementById("divSel_cuentasTerceros_2");
                    var selectList2 = document.createElement("select");
                    selectList2.style.width = "600px";
                    selectList2.id = "NombreCuenta";
                    selectList2.onchange = function () { obtenerCuentaComboxTerceros(); };
                    myDiv2.appendChild(selectList2);

                    var option2 = document.createElement("option");
                    option2.value = "";
                    option2.text = "Seleccione la cuenta de dep&oacute;sito";
                    //option2.selected = "selected";
                    selectList2.appendChild(option2);

                    var option2 = document.createElement("option");
                    option2.value = "new";
                    option2.text = "Ingresar nueva cuenta";
                    selectList2.appendChild(option2);

                    //Con esto no perdemos el stilo, aseguramos que siempre este activo el Data Mini =  true
                    $('select').selectmenu({ mini: true });

                    for (var e2 = 0; e2 < cuentasTercerosObtenidas1.length; e2++) {

                        //aqui pintamos el select
                        var option2 = document.createElement("option");
                        option2.value = cuentasTercerosObtenidas1[e2].cuenta_depo;
                        option2.text = cuentasTercerosObtenidas1[e2].desctipcion;
                        selectList2.appendChild(option2);

                    } $('#NombreCuenta').selectmenu('refresh');

                    document.getElementById('LoadingImage').style.display = 'none';
                    return;
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        $.mobile.changePage('Error_Red.html');
                    } else if (exception === 'timeout') {
                        document.getElementById('LoadingImage').style.display = 'none';
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                    }
                },
                async: true
            }
        );

}

////Obtenemos el nombre del propietario de la cuenta a terceros al presionar el boton Validar
function obtenerNombreCuenta() {

    document.getElementById('LoadingImage').style.display = 'block';
    document.getElementById('LoadingImage').style.background = "#C2BBBB url('images/loader.gif') no-repeat center";

    var Nombre_cuenta = urlws + 'GET_NOMBRE_DE_CUENTA/noCuenta/' + document.getElementById("NumeroCuentaT").value + '/Description/' + document.getElementById('DescripCuentaT').value;

    $.ajax(
            {
                type: "GET",
                url: Nombre_cuenta,
                data: "{}",
                timeout: 90000,
                cache: false,
                contentType: "json",
                success: function (cuentaNombre) {
                    if (cuentaNombre == undefined) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        cuentaNombre = "-1";
                    }
                    if (cuentaNombre == "") {
                        document.getElementById('LoadingImage').style.display = 'none';
                        alert('Verifique la Descripci\u00f3n y el No. de cuenta');
                        document.getElementById("nombre_existeT").value = "0";
                    }
                    if (cuentaNombre != "") {
                        for (var e1 = 0; e1 < cuentaNombre.length; e1++) {
                            document.getElementById("NombreBeneficiarioT").value = cuentaNombre[e1].nomBenef;
                            document.getElementById("idBankT").value = cuentaNombre[e1].idBank;
                            document.getElementById("nameBankT").value = cuentaNombre[e1].nomBank;
                        }

                        document.getElementById('LoadingImage').style.display = 'none';
                        document.getElementById("nombre_existeT").value = "1";
                    }
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        $.mobile.changePage('Error_Red.html');
                    } else if (exception === 'timeout') {
                        document.getElementById('LoadingImage').style.display = 'none';
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                    }
                },
                async: true
            }
        );
}

////Obtener las Cuentas para mandarlos a los combo-box de Cuentas SPEI
function getCuentasSPEI_Cuenta() {

    document.getElementById('LoadingImage').style.display = 'block';
    document.getElementById('LoadingImage').style.background = "#C2BBBB url('images/loader.gif') no-repeat center";

    var comodin = "";
    var comodin = document.getElementById('n.cuenta.popup').value;
    document.getElementById('n.cuenta.popup').value = "";

    var cliente = localStorage.getItem("CLIENTE");
    var GET_TOKEN = urlws + 'GET_CUENTAS/nocliente/' + cliente + '/producto/2';

    $.ajax(
            {
                type: "GET",
                url: GET_TOKEN,
                data: "{}",
                timeout: 90000,
                cache: false,
                contentType: "json",
                success: function (cuentasSPEIObtenidas) {

                    //aqui creamos el select
                    document.getElementById("divSel_cuentasSPEI_1").innerHTML = "";
                    var myDiv = document.getElementById("divSel_cuentasSPEI_1");
                    var selectList = document.createElement("select");
                    selectList.style.width = "600px";
                    selectList.id = "CuenCargoSPEI";
                    myDiv.appendChild(selectList);

                    var option = document.createElement("option");
                    option.value = "";
                    option.text = "Seleccione la cuenta de cargo";
                    //option.selected = "selected";
                    selectList.appendChild(option);

                    //Con esto no perdemos el stilo, aseguramos que siempre este activo el Data Mini =  true
                    $('select').selectmenu({ mini: true });

                    for (var e1 = 0; e1 < cuentasSPEIObtenidas.length; e1++) {

                        //aqui pintamos el select
                        var option = document.createElement("option");
                        option.value = cuentasSPEIObtenidas[e1].noCuenta + "-" + cuentasSPEIObtenidas[e1].sNProducto;
                        option.text = "*****" + (cuentasSPEIObtenidas[e1].noCuenta).substring(9) + " - Saldo: " + cuentasSPEIObtenidas[e1].cSaldo + " - Cuenta: " + cuentasSPEIObtenidas[e1].sSTipo;
                        if (cuentasSPEIObtenidas[e1].noCuenta == comodin) {
                            option.selected = "selected";
                        }
                        selectList.appendChild(option);

                    } $('#CuenCargoSPEI').selectmenu('refresh');

                    document.getElementById('LoadingImage').style.display = 'none';
                    return;
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        $.mobile.changePage('Error_Red.html');
                    } else if (exception === 'timeout') {
                        document.getElementById('LoadingImage').style.display = 'none';
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                    }
                },
                async: false
            }
        );

}

function getCuentasSPEI_Nombre() {

    document.getElementById('LoadingImage').style.display = 'block';
    document.getElementById('LoadingImage').style.background = "#C2BBBB url('images/loader.gif') no-repeat center";

    var cliente = localStorage.getItem("CLIENTE");
    var GET_TOKEN = urlws + 'NOMBRE_CUENTAS_SPEI/nocliente/' + cliente;

    $.ajax(
            {
                type: "GET",
                url: GET_TOKEN,
                data: "{}",
                timeout: 90000,
                cache: false,
                contentType: "json",
                success: function (cuentasSPEIObtenidas1) {

                    //aqui creamos el select
                    document.getElementById("divSel_cuentasSPEI_2").innerHTML = "";
                    var myDiv2 = document.getElementById("divSel_cuentasSPEI_2");
                    var selectList2 = document.createElement("select");
                    selectList2.style.width = "600px";
                    selectList2.id = "NombreCuentaSPEI";
                    selectList2.onchange = function () { obtenerCuentaComboxSPEI(); };
                    myDiv2.appendChild(selectList2);

                    var option2 = document.createElement("option");
                    option2.value = "";
                    option2.text = "Seleccione la cuenta de dep&oacute;sito";
                    //option2.selected = "selected";
                    selectList2.appendChild(option2);

                    var option2 = document.createElement("option");
                    option2.value = "new";
                    option2.text = "Ingresar nueva cuenta";
                    selectList2.appendChild(option2);

                    //Con esto no perdemos el stilo, aseguramos que siempre este activo el Data Mini =  true
                    $('select').selectmenu({ mini: true });

                    for (var e2 = 0; e2 < cuentasSPEIObtenidas1.length; e2++) {

                        //aqui pintamos el select
                        var option2 = document.createElement("option");
                        option2.value = cuentasSPEIObtenidas1[e2].cuenta_depo + '-' + cuentasSPEIObtenidas1[e2].banco + '-' + cuentasSPEIObtenidas1[e2].idBanco;
                        option2.text = cuentasSPEIObtenidas1[e2].desctipcion;
                        selectList2.appendChild(option2);

                    } $('#NombreCuentaSPEI').selectmenu('refresh');

                    document.getElementById('LoadingImage').style.display = 'none';
                    return;
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        $.mobile.changePage('Error_Red.html');
                    } else if (exception === 'timeout') {
                        document.getElementById('LoadingImage').style.display = 'none';
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                    }
                },
                async: true
            }
        );

}

////Obtener las cuentas para mandarlos a los combo-box de Servicios
function getCuentasServicios_Cuenta() {

    document.getElementById('LoadingImage').style.display = 'block';
    document.getElementById('LoadingImage').style.background = "#C2BBBB url('images/loader.gif') no-repeat center";

    var cliente = localStorage.getItem("CLIENTE");
    var GET_SERVICIOS = urlws + 'GET_CUENTAS/nocliente/' + cliente + '/producto/2';

    $.ajax(
            {
                type: "GET",
                url: GET_SERVICIOS,
                data: "{}",
                timeout: 90000,
                cache: false,
                contentType: "json",
                success: function (ServiciosObtenidos) {

                    //aqui creamos el select
                    document.getElementById("divSel_pagoServicio_1").innerHTML = "";
                    var myDiv = document.getElementById("divSel_pagoServicio_1");
                    var selectList = document.createElement("select");
                    selectList.style.width = "600px";
                    selectList.id = "Cuenta_Cargo_Pago";
                    myDiv.appendChild(selectList);

                    var option = document.createElement("option");
                    option.value = "";
                    option.text = "Seleccione la cuenta de cargo";
                    //option.selected = "selected";
                    selectList.appendChild(option);

                    //Con esto no perdemos el stilo, aseguramos que siempre este activo el Data Mini =  true
                    $('select').selectmenu({ mini: true });

                    for (var e1 = 0; e1 < ServiciosObtenidos.length; e1++) {

                        //aqui pintamos el select
                        var option = document.createElement("option");
                        option.value = ServiciosObtenidos[e1].noCuenta + "-" + ServiciosObtenidos[e1].sNProducto;
                        option.text = "*****" + (ServiciosObtenidos[e1].noCuenta).substring(9) + " - Saldo: " + ServiciosObtenidos[e1].cSaldo + " - Cuenta: " + ServiciosObtenidos[e1].sSTipo;
                        selectList.appendChild(option);

                    } $('#Cuenta_Cargo_Pago').selectmenu('refresh');

                    document.getElementById('LoadingImage').style.display = 'none';
                    return;
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        $.mobile.changePage('Error_Red.html');
                    } else if (exception === 'timeout') {
                        document.getElementById('LoadingImage').style.display = 'none';
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                    }
                },
                async: false
            }
        );

}

function getCuentasServicios_Nombre() {

    var context = document.getElementById('imgPagoServicio').getContext("2d");
    var img = new Image();
    img.src = "images/Servicios/servicios.jpg";

    img.onload = function (e) {
        context.drawImage(img, 5, 5, 115, 115);
    }

    var cliente = localStorage.getItem("CLIENTE");
    var GET_NAMESERVICIOS = urlws + 'GET_NAME_SERVICE/noCliente/' + cliente;

    $.ajax(
            {
                type: "GET",
                url: GET_NAMESERVICIOS,
                data: "{}",
                timeout: 90000,
                cache: false,
                contentType: "json",
                success: function (NombredeServicios) {

                    //aqui creamos el select
                    document.getElementById("divSel_pagoServicio_2").innerHTML = "";
                    var myDiv2 = document.getElementById("divSel_pagoServicio_2");
                    var selectList2 = document.createElement("select");
                    selectList2.style.width = "600px";
                    selectList2.id = "ServicioaPagar";
                    selectList2.onchange = function () { obtenerCuentaComboxPagoServicio(); };
                    myDiv2.appendChild(selectList2);

                    var option2 = document.createElement("option");
                    option2.value = "";
                    option2.text = "Seleccione el Servicio";
                    //option2.selected = "selected";
                    selectList2.appendChild(option2);

                    var option2 = document.createElement("option");
                    option2.value = "new";
                    option2.text = "Ingresar nuevo Servicio";
                    selectList2.appendChild(option2);

                    //Con esto no perdemos el stilo, aseguramos que siempre este activo el Data Mini =  true
                    $('select').selectmenu({ mini: true });

                   // alert(NombredeServicios);
                    for (var e1 = 0; e1 < NombredeServicios.length; e1++) {

                        //aqui pintamos el select
                        var option2 = document.createElement("option");
                        option2.value = NombredeServicios[e1].referencia_S + '-' + NombredeServicios[e1].datos_S;
                        option2.text = NombredeServicios[e1].descripcion_S;
                        selectList2.appendChild(option2);
                        $('select').selectmenu({ mini: true });
                    }


                    $('#ServicioaPagar').selectmenu('refresh');

                    return;
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        $.mobile.changePage('Error_Red.html');
                    } else if (exception === 'timeout') {
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                    }
                },
                async: true
            }
        );

}

////Validamos si el numero de cuenta esta corresto y que los campos no esten vacios (Nueva Cuenta a Terceros)
function nuevaCuentaTercerosValidar() {

    //if (document.getElementById('NumeroCuentaT').value.length < 18) {
    //    alert('La longitud del n\u00famero de cuenta es muy corta'); return;
    //}
    if (document.getElementById('DescripCuentaT').value == '' || document.getElementById('NumeroCuentaT').value == '' || document.getElementById('NombreBeneficiarioT').value == '' || document.getElementById("nombre_existeT").value == "0") {
        alert('Por favor complete el formulario'); return;
    }
    else {
        document.getElementById('DescripCuenta_T').value = document.getElementById('DescripCuentaT').value;
        document.getElementById('NumeroCuenta_T').value = document.getElementById('NumeroCuentaT').value;
        document.getElementById('NombreBeneficiario_T').value = document.getElementById('NombreBeneficiarioT').value;

        $.mobile.changePage('#frmConfNuevaCuentaTerceros'); return;
    }

}

////Si paso la validacion Ingresamos la nueva cuenta de Terceros a la DB        ******Momento Critico******
function nuevaCuentaTercerosIngresarDB() {

    localStorage.setItem("waiting", 1); //Esta es la Bandera que dira si permite terminar el procesos cuando el telefono Hiberne.

    document.getElementById('LoadingImage').style.display = 'block';
    document.getElementById('LoadingImage').style.background = "#C2BBBB url('images/loader.gif') no-repeat center";

    var des_cuenta = document.getElementById('DescripCuenta_T').value;                  //Descripcion de la Cuenta
    var nom_beneficiario = document.getElementById('NombreBeneficiario_T').value;       //Nombre del beneficiario
    //var tipo_cuenta = "";                                                               //Tipo de ceunta que maneja
    //var moneda = "";                                                                    //Moneda que se usa
    var nom_banco = document.getElementById('nameBankT').value;                        //Nombre del banco que esta (por default es el Banco Modelo)
    var num_cuenta = document.getElementById('NumeroCuenta_T').value;                   //Cuenta clave del nuevo beneficiario
    //var fecha_modificacion = "";                                                        //Fecha modificacion de la cuenta
    //var status = "1";                                                                   //Estatus del la cuenta
    var no_cliente = localStorage.getItem("CLIENTE");                                     //Numero del cliente quien ingresa al nuevo beneficiario
    //var favorito = "0";                                                                 //Favorito
    var id_banco = document.getElementById('idBankT').value;                              //Id banco

    //alert(des_cuenta + ' ' + nom_beneficiario + ' ' + nom_banco + ' ' + num_cuenta + ' ' + no_cliente + ' ' + id_banco);

    var NuevaCuentaTerceros = urlws + 'Nueva_Cuenta_Terceros_SPEI/descripcion/' + des_cuenta + '/beneficiario/' + nom_beneficiario + '/cliente/' + no_cliente + '/idBanco/' + id_banco + '/NomBanco/' + nom_banco + '/CtaClave/' + num_cuenta;

    $.ajax(
            {
                type: "GET",
                url: NuevaCuentaTerceros,
                data: "{}",
                timeout: 90000,
                cache: false,
                contentType: "json",
                success: function (NuevaTerceros) {
                    if (NuevaTerceros == undefined) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        NuevaTerceros = "-1";
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); return;
                    }
                    else {
                        if (NuevaTerceros == '0') {
                            document.getElementById('LoadingImage').style.display = 'none';
                            alert('Cuenta no Registrada');
                            localStorage.setItem("waiting", 0);
                            $.mobile.changePage('BancaMovil.html');
                        }
                        if (NuevaTerceros == '1') {
                            document.getElementById('LoadingImage').style.display = 'none';
                            alert('Nueva Cuenta Registrada');
                            localStorage.setItem("waiting", 0);
                            $.mobile.changePage('#frmCuentasATerceros'); return;
                        }
                    }
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        localStorage.setItem("waiting", 0);
                        alert('A ocurrido un error de red; intente de nuevo, o m\u00e1s tarde'); return;
                    } else if (exception === 'timeout') {
                        document.getElementById('LoadingImage').style.display = 'none';
                        localStorage.setItem("waiting", 0);
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); return;
                    }
                },
                async: true
            }
        );
}

////Validamos si el numero de cuenta esta corresto y que los campos no esten vacios (Nueva Cuenta a SPEI)
function nuevaCuentaSPEIValidar() {

    //if (document.getElementById('NumeroCuentaS').value.length < 18)
    //{
    //    alert('La longitud del n\u00famero de cuenta es muy corta'); return;
    //}
    if (document.getElementById('DescripCuentaS').value == '' || document.getElementById('NumeroCuentaS').value == '' || document.getElementById('NombreBeneficiarioS').value == '' || document.getElementById('NombreBancoS').value == '') {
        alert('Por favor complete el formulario'); return;
    }
    else {
        document.getElementById('LoadingImage').style.display = 'block';
        document.getElementById('LoadingImage').style.background = "#C2BBBB url('images/loader.gif') no-repeat center";

        document.getElementById('LoadingImage').style.display = 'none';
        document.getElementById('DescripCuenta_SP').value = document.getElementById('DescripCuentaS').value;
        document.getElementById('NumeroCuenta_SP').value = document.getElementById('NumeroCuentaS').value;
        document.getElementById('NombreBeneficiario_SP').value = document.getElementById('NombreBeneficiarioS').value;
        document.getElementById('NombreBanco_SP').value = document.getElementById("NombreBancoS").options[document.getElementById("NombreBancoS").selectedIndex].text;
        //Este dato tiene el id del banco que se selecciono en el select -->  document.getElementById('NombreBancoS').value;
        document.getElementById('LoadingImage').style.display = 'none';
        $.mobile.changePage('#frmConfNuevaCuentaSPEI'); return;

        //Dejo esto, por si en dado caso se quisiera implementar
        //var Validacion_SPEI = urlws + 'Validacion_Cuenta_SPEI/noCuenta/' + document.getElementById('NumeroCuentaS').value + '/Description/' + document.getElementById('DescripCuentaS').value;
        //$.ajax(
        //        {
        //            type: "GET",
        //            url: Validacion_SPEI,
        //            data: "{}",
        //            timeout: 90000,
        //            contentType: "json",
        //            success: function (ValidaSPEI) {
        //                if (ValidaSPEI == undefined) {
        //                    ValidaSPEI = "-1";
        //                }
        //                if (ValidaSPEI == "0") {
        //                    alert('Verifique la Descripci\u00f3n y el No. de cuenta');
        //                    document.getElementById('LoadingImage').style.display = 'none';
        //                }
        //                if (ValidaSPEI == "1") {

        //                    document.getElementById('LoadingImage').style.display = 'none';
        //                    document.getElementById('DescripCuenta_SP').value = document.getElementById('DescripCuentaS').value;
        //                    document.getElementById('NumeroCuenta_SP').value = document.getElementById('NumeroCuentaS').value;
        //                    document.getElementById('NombreBeneficiario_SP').value = document.getElementById('NombreBeneficiarioS').value;
        //                    document.getElementById('NombreBanco_SP').value = document.getElementById("NombreBancoS").options[document.getElementById("NombreBancoS").selectedIndex].text;
        //                    //Este dato tiene el id del banco que se selecciono en el select -->  document.getElementById('NombreBancoS').value;
        //                    document.getElementById('LoadingImage').style.display = 'none';
        //                    $.mobile.changePage('#frmConfNuevaCuentaSPEI'); return;
        //                }
        //            },
        //            error: function (jqXHR, exception) {
        //                if (exception === 'parsererror') {
        //                    alert('parser error'); return;
        //                } else if (exception === 'timeout') {
        //                    document.getElementById('LoadingImage').style.display = 'none';
        //                    alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); return;
        //                } else if (exception === 'abort') {
        //                    alert('abort'); return;
        //                } else {
        //                    //alert('Undefined'); return;
        //                }
        //            },
        //            async: true
        //        }
        //    );

    } //End ELSE
}

////Si paso la validacion Ingresamos la nueva cuenta de SPEI a la DB        ******Momento Critico******
function nuevaCuentaSPEIngresarDB() {

    localStorage.setItem("waiting", 1); //Esta es la Bandera que dira si permite terminar el procesos cuando el telefono Hiberne.

    document.getElementById('LoadingImage').style.display = 'block';
    document.getElementById('LoadingImage').style.background = "#C2BBBB url('images/loader.gif') no-repeat center";

    var des_cuenta = document.getElementById('DescripCuenta_SP').value;
    var num_cuenta = document.getElementById('NumeroCuenta_SP').value;
    var nom_beneficiario = document.getElementById('NombreBeneficiario_SP').value;
    var nom_banco = document.getElementById('NombreBanco_SP').value;
    var id_banco = document.getElementById('NombreBancoS').value;
    var no_cliente = localStorage.getItem("CLIENTE");

    //alert(des_cuenta + '' + num_cuenta + '' + nom_beneficiario + '' + nom_banco + ' ' + id_banco + ' ' + no_cliente);

    var NuevaCuentaSPEI = urlws + 'Nueva_Cuenta_Terceros_SPEI/descripcion/' + des_cuenta + '/beneficiario/' + nom_beneficiario + '/cliente/' + no_cliente + '/idBanco/' + id_banco + '/NomBanco/' + nom_banco + '/CtaClave/' + num_cuenta;

    $.ajax(
            {
                type: "GET",
                url: NuevaCuentaSPEI,
                data: "{}",
                timeout: 90000,
                cache: false,
                contentType: "json",
                success: function (NuevaSPEI) {
                    if (NuevaSPEI == undefined) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        NuevaSPEI = "-1";
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); return;
                    }
                    else {
                        if (NuevaSPEI == '0') {
                            document.getElementById('LoadingImage').style.display = 'none';
                            alert('Cuenta no Registrada');
                            localStorage.setItem("waiting", 0);
                            $.mobile.changePage('BancaMovil.html');
                        }
                        if (NuevaSPEI == '1') {
                            document.getElementById('LoadingImage').style.display = 'none';
                            alert('Nueva Cuenta Registrada');
                            localStorage.setItem("waiting", 0);
                            $.mobile.changePage('#frmSPEI'); return;
                        }
                    }
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        localStorage.setItem("waiting", 0);
                        alert('A ocurrido un error de red; intente de nuevo, o m\u00e1s tarde'); return;
                    } else if (exception === 'timeout') {
                        document.getElementById('LoadingImage').style.display = 'none';
                        localStorage.setItem("waiting", 0);
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); return;
                    }
                },
                async: true
            }
        );
}

////Validamos si los datos son correctos y que los campos no esten vacios (Nuevo Pago de Servicio)
function nuevoPagoServicioValidar() {
    //if (document.getElementById('ReferenciaNewPago').value.length < 18) {
    //    alert('La longitud de referencia es muy corta'); return;
    //}
    //if (document.getElementById('ReferenciaNewPago').value.length < 18) {
    //    alert('Clabe Incorrecta'); return;
    //}
    if (document.getElementById('DescripCortaServicioNew').value == '' || document.getElementById('ServicioSelectNew').value == '' || document.getElementById('ReferenciaNewPago').value == '') {
        alert('Por favor complete el formulario'); return;
    }
    else {

        document.getElementById('LoadingImage').style.display = 'block';
        document.getElementById('LoadingImage').style.background = "#C2BBBB url('images/loader.gif') no-repeat center";
        var no_cliente = localStorage.getItem("CLIENTE");

        var Validacion_Servicios = urlws + 'Validacion_Pago_Servicio/noCliente/' + no_cliente + '/Description/' + document.getElementById('DescripCortaServicioNew').value;

        $.ajax(
                {                                                       //Si me regresa un 0 No existe la cuenta, si me regresa un 1 existe la cuenta en la BD
                    type: "GET",
                    url: Validacion_Servicios,
                    data: "{}",
                    timeout: 90000,
                    cache: false,
                    contentType: "json",
                    success: function (ValidaServicio) {
                        if (ValidaServicio == undefined) {
                            document.getElementById('LoadingImage').style.display = 'none';
                            ValidaServicio = "-1";
                            alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); return;
                        }
                        if (ValidaServicio == "1") {
                            document.getElementById('LoadingImage').style.display = 'none';
                            alert('Verifique la Descripci\u00f3n y el No. de cuenta');
                            return;
                        }
                        if (ValidaServicio == "0") {

                            document.getElementById('LoadingImage').style.display = 'none';
                            var context = document.getElementById('imgPagoServicioNewConf').getContext("2d");
                            var img = new Image();
                            img.src = document.getElementById('URLimagePagoServicioNew').value;

                            img.onload = function (e) {
                                context.drawImage(img, 5, 5, 115, 115);
                            }
                            document.getElementById('DescripCortaServicioNew_').value = document.getElementById('DescripCortaServicioNew').value;
                            document.getElementById('ReferenciaNewPago_').value = document.getElementById('ReferenciaNewPago').value;
                            document.getElementById('ServicioSelectNew_').value = document.getElementById("ServicioSelectNew").options[document.getElementById("ServicioSelectNew").selectedIndex].text;
                            document.getElementById('URLComboBoxSelectNew').value = document.getElementById('ServicioSelectNew').value;

                            $.mobile.changePage('#frmConfNuevoPagarServicio'); return;
                        }
                    },
                    error: function (jqXHR, exception) {
                        if (jqXHR.status === 0) {
                            document.getElementById('LoadingImage').style.display = 'none';
                            $.mobile.changePage('Error_Red.html');
                        } else if (exception === 'timeout') {
                            document.getElementById('LoadingImage').style.display = 'none';
                            alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); return;
                        }
                    },
                    async: true
                }
            );
    } //End ELSE
}

////Si paso la validacion Ingresamos el nuevo Servicio a la DB       ******Momento Critico******
function nuevoPagoServicioIngresarDB() {
    localStorage.setItem("waiting", 1); //Esta es la Bandera que dira si permite terminar el procesos cuando el telefono Hiberne.

    document.getElementById('LoadingImage').style.display = 'block';
    document.getElementById('LoadingImage').style.background = "#C2BBBB url('images/loader.gif') no-repeat center";

    var descripcion = document.getElementById('DescripCortaServicioNew_').value;
    var no_cliente = localStorage.getItem("CLIENTE");
    var refe_numerica = document.getElementById('ReferenciaNewPago_').value;

    var cad_cort_Service = document.getElementById('URLComboBoxSelectNew').value.split("-");
    var cad1 = cad_cort_Service[0];
    var cad2 = cad_cort_Service[1].slice(26);

    var datoservicios = cad1 + '-' + cad2;

    var nombreServicio = document.getElementById('ServicioSelectNew_').value;

    //alert(descripcion + ' ' + no_cliente + ' ' + refe_numerica + ' ' + datoservicios + ' ' + nombreServicio);

    var NuevoPagoServicio = urlws + 'Nuevo_Pago_Servicio/Descripcion/' + descripcion + '/noCliente/' + no_cliente + '/refNumerica/' + refe_numerica + '/DatoServicio/' + datoservicios + '/Servicio/' + nombreServicio;

    $.ajax(
            {
                type: "GET",
                url: NuevoPagoServicio,
                data: "{}",
                timeout: 90000,
                cache: false,
                contentType: "json",
                success: function (NuevPago) {
                    if (NuevPago == undefined) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        NuevPago = "-1";
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); return;
                    }
                    if (NuevPago == '0') {
                        document.getElementById('LoadingImage').style.display = 'none';
                        alert('Cuenta no Registrada');
                        localStorage.setItem("waiting", 0);
                        $.mobile.changePage('BancaMovil.html');
                    }
                    if (NuevPago == '1') {
                        document.getElementById('LoadingImage').style.display = 'none';
                        alert('Nueva Cuenta Registrada');
                        localStorage.setItem("waiting", 0);
                        

                        $("#frmPagarServicio").on("pageshow", function () {
                          
                            getCuentasServicios_Cuenta(); getCuentasServicios_Nombre();
                        });

                        $.mobile.changePage('#frmPagarServicio');

                        return;
                    }
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        localStorage.setItem("waiting", 0);
                        alert('A ocurrido un error de red; intente de nuevo, o m\u00e1s tarde'); return;
                    } else if (exception === 'timeout') {
                        document.getElementById('LoadingImage').style.display = 'none';
                        localStorage.setItem("waiting", 0);
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); return;
                    }
                },
                async: true
            }
        );
}

function getAllBank() {

    var GET_BANK = urlws + 'GET_ALL_BANK';

    $.ajax(
            {
                type: "GET",
                url: GET_BANK,
                data: "{}",
                timeout: 90000,
                cache: false,
                contentType: "json",
                success: function (AllBANK) {
                    if (AllBANK == undefined) {
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                        AllBANK = "-1";
                    }
                    else {

                        //aqui creamos el select
                        document.getElementById("divSel_Bancos_1").innerHTML = "";
                        var myDiv = document.getElementById("divSel_Bancos_1");
                        var selectList = document.createElement("select");
                        selectList.style.width = "600px";
                        selectList.id = "NombreBancoS";
                        myDiv.appendChild(selectList);

                        var option = document.createElement("option");
                        option.value = "";
                        option.text = "Seleccione nombre del banco";
                        //option.selected = "selected";
                        selectList.appendChild(option);

                        //Con esto no perdemos el stilo, aseguramos que siempre este activo el Data Mini =  true
                        $('select').selectmenu({ mini: true });

                        for (var e1 = 0; e1 < AllBANK.length; e1++) {

                            //aqui pintamos el select
                            var option = document.createElement("option");
                            option.value = AllBANK[e1].idAllBank;
                            option.text = AllBANK[e1].nomAllBank;
                            selectList.appendChild(option);

                        } $('#NombreBancoS').selectmenu('refresh');
                    }

                    return;
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        $.mobile.changePage('Error_Red.html');
                    } else if (exception === 'timeout') {
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                    }
                },
                async: false
            }
        );

}

function getAllService() {
    var context = document.getElementById('imgPagoServicioNew').getContext("2d");
    var img = new Image();
    img.src = "images/Servicios/servicios.jpg";
    img.onload = function (e) {
        context.drawImage(img, 5, 5, 115, 115);
    }

    var GET_SERVICE = urlws + 'GET_ALL_SERVICE';
    //alert(GET_SERVICE);
    $.ajax(
            {
                type: "GET",
                url: GET_SERVICE,
                data: "{}",
                timeout: 9000,
                cache: false,
                contentType: "json",
                success: function (ALLSERVICE) {
                    if (ALLSERVICE == undefined) {
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                        ALLSERVICE = "-1";
                    }
                    else {

                        //aqui creamos el select
                        document.getElementById("divSel_Servicios_1").innerHTML = "";
                        var myDiv = document.getElementById("divSel_Servicios_1");
                        var selectList = document.createElement("select");
                        selectList.style.width = "600px";
                        selectList.id = "ServicioSelectNew";
                        selectList.onchange = function () { obtenerCuentaComboxPagoServicioNEW(); };
                        myDiv.appendChild(selectList);

                        var option = document.createElement("option");
                        option.value = "";
                        option.text = "Seleccione el Servicio";
                        //option.selected = "selected";
                        selectList.appendChild(option);

                        //Con esto no perdemos el stilo, aseguramos que siempre este activo el Data Mini =  true
                        $('select').selectmenu({ mini: true });

                        for (var e1 = 0; e1 < ALLSERVICE.length; e1++) {

                            //aqui pintamos el select
                            var option = document.createElement("option");
                            option.value = ALLSERVICE[e1].idAllService + '-' + ALLSERVICE[e1].imgAllService;
                            option.text = ALLSERVICE[e1].nomAllService;
                            selectList.appendChild(option);

                        }
                    } $('#ServicioSelectNew').selectmenu('refresh');

                    return;
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        $.mobile.changePage('Error_Red.html');
                    } else if (exception === 'timeout') {
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                    }
                },
                async: false
            }
        );
}

function changeTo(target) {
    $.mobile.changePage(target, {
        transition: "none",
        changeHash: false
    });
}

function toast(mensaje) {

    document.getElementById('toast').innerHTML = '<br>' + mensaje;
    $("#toast").fadeIn();
    setTimeout(function () {

        $("#toast").fadeOut();
    }, 1300);
}

function ajustaResize(descuento) {
    // alert(1);
    var relativo = document.getElementById('relativo');
    var relativo2 = document.getElementById('relativo2');

    var myWidth = 600, myHeight = 600;
    if (typeof (window.innerWidth) == 'number') {
        //Non-IE
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        //IE 6+ in 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
    } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        //IE 4 compatible
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
    }

    relativo.style.height = (myHeight - descuento) + "px";
    relativo2.style.height = (myHeight - descuento) + "px";
}

////Grid de Cuentas
function getMisCuentasGrid(producto,titulo) {
    //3 cuentas basicas
    //2 TC
    //5 Creditos
    //4 Inversiones


    //document.getElementById('LoadingImage').style.display = 'block';
    //document.getElementById('LoadingImage').style.background = "#C2BBBB url('images/loader.gif') no-repeat center";
    
    //$("#centralContent").html("");
    var cliente = localStorage.getItem("CLIENTE");
    var GET_TOKEN = urlws + 'GET_GRID/nocliente/' + cliente + '/producto/'+producto+'/titulo/'+titulo;
    console.log(GET_TOKEN);
    console.log('recargando inversiones..');
    $.ajax(
            {
                type: "GET",
                url: GET_TOKEN,
                data: "{}",
                timeout: 90000,
                cache: false,
                contentType: "json",
                success: function (objRegreso) {
                    if (objRegreso == undefined) {
                        //document.getElementById('LoadingImage').style.display = 'none';
                        objRegreso = "-1";
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                    }
                    else {
                        if (objRegreso == '0') {
                            //document.getElementById("divMisCuentas").innerHTML = objRegreso;
                            if (producto == '3') {
                                $("#grdCtasBancarias").html(objRegreso);
                            }
                            if (producto == '2') {
                                $("#grdCreditos").html(objRegreso);
                            }
                            if (producto == '4') {
                                console.log('recargando inversiones.2.');
                                $("#grdInversiones").html(objRegreso);
                            }
                            
                            alert('Servicio no disponible');
                            $.mobile.changePage('BancaMovil.html');
                        }
                        else {
                            //document.getElementById('LoadingImage').style.display = 'none';
                            //document.getElementById("divMisCuentas").innerHTML = objRegreso;
                            //$("#centralContent").html($("#centralContent").html() + objRegreso );
                            if (producto == '3') {
                                $("#grdCtasBancarias").html(objRegreso);
                            }
                            if (producto == '2') {
                                $("#grdCreditos").html(objRegreso);
                            }
                            if (producto == '4') {
                                console.log('recargando inversiones.3.');
                                $("#grdInversiones").html(objRegreso);
                            }
                           // return objRegreso;
                        }

                    }
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        //document.getElementById('LoadingImage').style.display = 'none';
                        $.mobile.changePage('Error_Red.html');
                    } else if (exception === 'timeout') {
                        //document.getElementById('LoadingImage').style.display = 'none';
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                    }
                },
                async: true
            }
        );
}

////Grid de Inversiones
function getMisInversionesGrid() {

    document.getElementById('LoadingImage').style.display = 'block';
    document.getElementById('LoadingImage').style.background = "#C2BBBB url('images/loader.gif') no-repeat center";
    document.getElementById("divMisInversiones").innerHTML = "";

    var cliente = localStorage.getItem("CLIENTE");
    var GET_TOKEN = urlws + 'GET_GRID/nocliente/' + cliente + '/producto/4';

    $.ajax(
            {
                type: "GET",
                url: GET_TOKEN,
                data: "{}",
                timeout: 90000,
                cache: false,
                contentType: "json",
                success: function (objRegreso) {
                    if (objRegreso == undefined) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        objRegreso = "-1";
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                    }
                    else {
                        if (objRegreso == '0') {
                            document.getElementById('LoadingImage').style.display = 'none';
                            alert('Servicio no disponible');
                            $.mobile.changePage('BancaMovil.html');
                        }
                        else {
                            document.getElementById('LoadingImage').style.display = 'none';
                            document.getElementById("divMisInversiones").innerHTML = objRegreso;
                        }

                    }
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        $.mobile.changePage('Error_Red.html');
                    } else if (exception === 'timeout') {
                        document.getElementById('LoadingImage').style.display = 'none';
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                    }
                },
                async: true
            }
        );

}

////Grid de Creditos
function getMisCreditosGrid() {

    document.getElementById('LoadingImage').style.display = 'block';
    document.getElementById('LoadingImage').style.background = "#C2BBBB url('images/loader.gif') no-repeat center";
    document.getElementById("divMisCreditos").innerHTML = "";

    var cliente = localStorage.getItem("CLIENTE");
    var GET_TOKEN = urlws + 'GET_GRID/nocliente/' + cliente + '/producto/5';
    //alert(GET_TOKEN);
    $.ajax(
            {
                type: "GET",
                url: GET_TOKEN,
                data: "{}",
                timeout: 90000,
                cache: false,
                contentType: "json",
                success: function (objRegreso) {
                    if (objRegreso == undefined) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        objRegreso = "-1";
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                    }
                    else {
                        if (objRegreso == '0') {
                            document.getElementById('LoadingImage').style.display = 'none';
                            alert('Servicio no disponible');
                            $.mobile.changePage('BancaMovil.html');
                        }
                        else {
                            document.getElementById('LoadingImage').style.display = 'none';
                            document.getElementById("divMisCreditos").innerHTML = objRegreso;
                        }

                    }
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        $.mobile.changePage('Error_Red.html');
                    } else if (exception === 'timeout') {
                        document.getElementById('LoadingImage').style.display = 'none';
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                    }
                },
                async: true
            }
        );

}

function getMisCuentasCbo() {

    var cliente = localStorage.getItem("CLIENTE");
    var GET_TOKEN = urlws + 'HB_ObtenerCuentasClienteMCbo/user/HOBA/cve/HOBA123/nocliente/' + cliente;

    $.ajax(
            {
                type: "GET",
                url: GET_TOKEN,
                data: "{}",
                timeout: 9000,
                cache: false,
                contentType: "json",
                success: function (objRegreso) {
                    if (objRegreso == undefined) {
                        objRegreso = "-1";
                    }
                    else {
                        if (objRegreso == '0') {
                            alert('Servicio no disponible');
                            $.mobile.changePage('BancaMovil.html');
                        }
                        else {
                            document.getElementById("divMisCuentasCbo").innerHTML = objRegreso;
                            document.getElementById('hiddenCuenta').value = '0';
                            document.getElementById('hiddenProducto').value = '0';
                            return;
                        }

                    }
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        $.mobile.changePage('Error_Red.html');
                    } else if (exception === 'timeout') {
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                    }
                },
                async: true
            }
        );
}

function getMovimientosDefault() {

    $("#popupBasic").popup("close");
    document.getElementById('LoadingImage').style.display = 'block';
    document.getElementById('LoadingImage').style.background = "#C2BBBB url('images/loader.gif') no-repeat center";

    var cliente = document.getElementById('n.cliente.popup').value;
    var num_cuenta = document.getElementById('n.cuenta.popup').value;

    document.getElementById('Ccliente').value = document.getElementById('n.cliente.popup').value;
    document.getElementById('NnoCuenta').value = document.getElementById('n.cuenta.popup').value;

    var fecha = new Date();

    var fecha_inicio = ('0' + fecha.getDate()).slice(-2) + '-' + ('0' + fecha.getMonth()).slice(-2) + '-' + fecha.getFullYear();
   // var fecha_fin = ('0' + fecha.getDate()).slice(-2) + '-' + ('0' + (fecha.getMonth() + 1)).slice(-2) + '-' + fecha.getFullYear();
    var fecha_fin = ('05' + '-') + ('0' + (fecha.getMonth() + 1)).slice(-2) + '-' + fecha.getFullYear();

    var GET_MOVIMIENTOS = urlws + 'TABLAS_CUENTA/nocliente/' + cliente + '/noCuenta/' + num_cuenta + '/fechaInicio/' + fecha_inicio + '/fechaFinal/' + fecha_fin;
    
    $.ajax(
            {
                type: "GET",
                url: GET_MOVIMIENTOS,
                data: "{}",
                timeout: 90000,
                cache: false,
                contentType: "json",
                success: function (objRegreso) {
                    if (objRegreso == undefined) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        objRegreso = "-1";
                    }
                    document.getElementById('fechaInicio').value = fecha_inicio;
                    document.getElementById('fechaFinal').value = fecha_fin;
                    document.getElementById('LoadingImage').style.display = 'none';
                    document.getElementById("divMisMovimientos").style.overflowX = "scroll";
                    document.getElementById("divMisMovimientos").style.overflowY = "scroll";
                    document.getElementById("divMisMovimientos").innerHTML = "";
                    document.getElementById("divMisMovimientos").innerHTML = objRegreso;
                    $.mobile.changePage('#frmMisMovimientos');
                    return;
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        $.mobile.changePage('Error_Red.html');
                    } else if (exception === 'timeout') {
                        document.getElementById('LoadingImage').style.display = 'none';
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                    }
                },
                async: true
            }
        );
}

function getMisMovs(cliente,cuenta,noDias) {

    
    var GET_MOVIMIENTOS = urlws + 'TABLAS_CUENTA/nocliente/' + cliente + '/noCuenta/' + cuenta + '/noDias/' + noDias;
    console.log(GET_MOVIMIENTOS);
    $.ajax(
            {
                type: "GET",
                url: GET_MOVIMIENTOS,
                data: "{}",
                timeout: 90000,
                cache: false,
                contentType: "json",
                success: function (objRegreso) {
                    if (objRegreso == undefined) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        objRegreso = "-1";
                    }

                   
                    $("#divGrdMovimientos").html(objRegreso);
                    return;
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        $.mobile.changePage('Error_Red.html');
                    } else if (exception === 'timeout') {
                        document.getElementById('LoadingImage').style.display = 'none';
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                    }
                },
                async: true
            }
        );
}

function Correo_Movimientos() {

    document.getElementById('LoadingImage').style.display = 'block';
    document.getElementById('LoadingImage').style.background = "#C2BBBB url('images/loader.gif') no-repeat center";

    //var dateInit;
    //var dateFinish;
    //var fecha = new Date();
    var fecha_inicio = document.getElementById('fechaInicio').value;
    var fecha_fin = document.getElementById('fechaFinal').value;
    var cliente = document.getElementById('Ccliente').value;
    var num_cuenta = document.getElementById('NnoCuenta').value;
    var asunto = "Movimientos Realizados";

    if ((fecha_inicio != "" && fecha_fin == "") || (fecha_inicio == "" && fecha_fin != "") || (fecha_inicio == "" && fecha_fin == "")) {
        document.getElementById('LoadingImage').style.display = 'none';
        alert("Por favor ingrese en ambos campos fechas validas"); return;
    }
    //if (fecha_inicio == "" && fecha_fin == "") {
    //    dateInit = ('0' + fecha.getDate()).slice(-2) + '-' + ('0' + fecha.getMonth()).slice(-2) + '-' + fecha.getFullYear();
    //    dateFinish = ('0' + fecha.getDate()).slice(-2) + '-' + ('0' + (fecha.getMonth() + 1)).slice(-2) + '-' + fecha.getFullYear();
    //}
    //if (fecha_inicio != "" && fecha_fin != "") {
    //    dateInit = document.getElementById('fechaInicio').value;
    //    dateFinish = document.getElementById('fechaFinal').value;
    //}

    fecha_inicio = fecha_inicio.replace("/", "-");
    fecha_inicio = fecha_inicio.replace("/", "-");
    fecha_fin = fecha_fin.replace("/", "-");
    fecha_fin = fecha_fin.replace("/", "-");

    var tk = GET_TOKEN(cliente);

    //alert(cliente + ' ' + num_cuenta + ' ' + fecha_inicio + ' ' + fecha_fin + ' ' + asunto + ' ' + tk);

    var CorreodeMovimientos = urlws + 'Enviar_Correo_Movimientos/nocliente/' + cliente + '/noCuenta/' + num_cuenta + '/fechaInicio/' + fecha_inicio + '/fechaFinal/' + fecha_fin + '/asunto/' + asunto + '/TK/' + tk;
   // alert(CorreodeMovimientos);
    $.ajax(
            {
                type: "GET",
                url: CorreodeMovimientos,
                data: "{}",
                timeout: 90000,
                cache: false,
                contentType: "json",
                success: function (objRegreso) {
                    if (objRegreso == undefined) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        objRegreso = "-1";
                        alert("Hubo un problema y no fue posible enviar el correo");
                        $.mobile.changePage("Hompage.html");
                        return;
                    }
                    if (objRegreso == true) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        alert("Se envi\u00f3 una copia a su Correo");
                        return;
                    }
                    if (objRegreso == false) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        alert("Hubo un problema y no fue posible enviar el correo");
                        return;
                    }
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        $.mobile.changePage('Error_Red.html');
                    } else if (exception === 'timeout') {
                        document.getElementById('LoadingImage').style.display = 'none';
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); return;
                    }
                },
                async: true
            }
        );
}

function DescargarComprobante() {
    var cadenaFinal = "";
    var path = Server.MapPath("images/logo.png");

    cadenaFinal += "<table> <tr> <td> </td><td align=center> Pago de servicio </td> <td> <img src='' width=140/></td> </tr> </table>  <br/><br/><br/>" +
        ////////////////////////////////colspan='2'///////////////////////////////////////////////////////
        "<table width=400 style=font-size:11px align=center>" +
        " <tr bgcolor='#A9D0F5'> <td> Cuenta de cargo:      </td> <td> </td> </tr>" +
        " <tr>                   <td> Servicio:             </td> <td> </td> </tr>" +
        " <tr bgcolor='#A9D0F5'> <td> Fecha de pago:        </td> <td> </td> </tr>" +
        " <tr>                   <td> Monto a pagar:        </td> <td> </td> </tr>" +
        " <tr bgcolor='#A9D0F5'> <td> Referencia numerica:  </td> <td> </td> </tr>" +
        "</table>";

    //using (StringWriter sw = new StringWriter())
    //{
    //                using (HtmlTextWriter hw = new HtmlTextWriter(sw))
    //{
    //                    StringReader sr = new StringReader(cadenaFinal);
    //    Document pdfDoc = new Document(PageSize.A4, 30.0f, 30.0f, 30.0f, 30f);
    //    HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
    //    PdfWriter.GetInstance(pdfDoc, Response.OutputStream);
    //    pdfDoc.Open();
    //    htmlparser.Parse(sr);
    //// pdfDoc.Add(pdfTable);
    //    pdfDoc.Close();

    //    string nombreF = IdiomaAlertas("String394") + "-" + DateTime.Today.ToString("dd/MM/yyyy");
    //    Response.ContentType = "application/pdf";
    //    Response.AddHeader("content-disposition", "attachment;filename=" + nombreF + ".pdf");
    //    Response.Cache.SetCacheability(HttpCacheability.NoCache);
    //    Response.Write(pdfDoc);
    ////Response.End();
    //}
    //}

}

function setCuentaProducto(noCuenta, noProducto) {
    document.getElementById('hiddenCuenta').value = noCuenta;
    document.getElementById('hiddenProducto').value = noProducto;
}

function enviarPOPUP(cliente, num_cuenta) {
    $("#popupBasic").popup("open");
    document.getElementById('n.cliente.popup').value = cliente;
    document.getElementById('n.cuenta.popup').value = num_cuenta;
}

function openPopupIndex() {
    $("#popupLogin").popup("open");
}

function Enviar_Correo_Cliente(noCliente, CCopia, asunto, id, mensaje) {
    var tk = '12345';//GET_TOKEN(noCliente);

    var CorreoACliente = urlws + 'Enviar_Correo_Cliente/noCliente/' + noCliente + '/CCopia/' + CCopia + '/asunto/' + asunto + '/TK/' + tk + '/id/' + id + '/Mensaje/' + mensaje;
    //alert(CorreoACliente);
    $.ajax(
            {
                type: "GET",
                url: CorreoACliente,
                data: "{}",
                timeout: 90000,
                cache: false,
                contentType: "json",
                success: function (objRegreso) {
                    if (objRegreso == undefined) {
                        objRegreso = "-1";
                        alert("La transacci\u00f3n se realiz\u00f3; pero no fue posible enviar el correo"); return;
                    }
                    if (objRegreso == true) {
                        alert("Se envi\u00f3 su recibo a su Correo"); return;
                    }
                    if (objRegreso == false) {
                        alert("La transacci\u00f3n se realiz\u00f3; pero no fue posible enviar el correo"); return;
                    }
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        alert('A ocurrido un error de red; no fue posible enviar el correo'); return;
                    } else if (exception === 'timeout') {
                        alert("La transacci\u00f3n se realiz\u00f3; pero no fue posible enviar el correo"); return;
                    }
                },
                async: true
            }
        );
}

function Enviar_Correo_Beneficiario(noCliente, correoBeneficiario, asunto, id, mensaje) {
    var tk = GET_TOKEN(noCliente);

    var CorreoABeneficiario = urlws + 'Enviar_Correo_Beneficiario/noCliente/' + noCliente + '/correoBeneficiario/' + correoBeneficiario + '/asunto/' + asunto + '/TK/' + tk + '/id/' + id + '/Mensaje/' + mensaje;

    $.ajax(
            {
                type: "GET",
                url: CorreoABeneficiario,
                data: "{}",
                timeout: 90000,
                cache: false,
                contentType: "json",
                success: function (objRegreso) {
                    if (objRegreso == undefined) {
                        objRegreso = "-1";
                        alert("La transacci\u00f3n se realiz\u00f3; pero no fue posible enviar el correo"); return;
                    }
                    if (objRegreso == true) {
                        alert("Se envi\u00f3 su recibo a su Correo y una copia al beneficiario"); return;
                    }
                    if (objRegreso == false) {
                        alert("La transacci\u00f3n se realiz\u00f3; pero no fue posible enviar el correo"); return;
                    }
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        alert('A ocurrido un error de red; no fue posible enviar el correo'); return;
                    } else if (exception === 'timeout') {
                        alert("La transacci\u00f3n se realiz\u00f3; pero no fue posible enviar el correo"); return;
                    }
                },
                async: true
            }
        );
}

function create_panel() {
    var panel = "<table border='0' bordercolor='#ffffff' bgcolor='#000000' style='text-align: left; font-size:15px; width: 100%;' cellspacing='0' cellpadding='0'>"+
                "<tr>"+
                    "<td width='100%'><a href='#' onclick='location.href = 'Hompage.html'' class='ui-btn ui-nodisc-icon ui-shadow ui-corner-all ui-icon-home ui-btn-icon-left' style='border-radius: 0px; font-size:15px; text-align: left;'>Menu Principal</a></td>"+
                "</tr>"+
                "<tr>"+
                    "<td width='100%'><a href='#' onclick='' class='ui-btn ui-nodisc-icon ui-shadow ui-corner-all ui-icon-alert ui-btn-icon-left' style='border-radius: 0px; font-size:15px; text-align: left;'>Ayuda urgente</a></td>"+
                "</tr>"+
                "<tr>"+
                    "<td width='100%'><a href='#' onclick='' class='ui-btn ui-nodisc-icon ui-shadow ui-corner-all ui-icon-phone ui-btn-icon-left' style='border-radius: 0px; font-size:15px; text-align: left;'>Centro de llamadas</a></td>"+
                "</tr>"+
                "<tr>"+
                    "<td width='100%'><a href='#' onclick='' class='ui-btn ui-nodisc-icon ui-shadow ui-corner-all ui-icon-delete ui-btn-icon-left' style='border-radius: 0px; font-size:15px; text-align: left;' data-rel='close'>Cerrar Menu</a></td>"+
                "</tr>"+
                "</table>";
    return panel;
}

function create_footer() {
    var table = "<table border='0' style='width:100%; text-align: left; font-size:15px' cellspacing='0' cellpadding='0'>" +
                "<tr>" +
                    "<td width='2%'></td>" +
                    "<td width='5%'><img src='images/persona-2.png' height='18' width='18'></td>" +
                    "<td width='25%'>&nbsp;&nbsp;" + "******" + (localStorage.getItem("CLIENTE")).substring(6) + "</td>" +
                    "<td width='61%'>&nbsp;&nbsp;" + localStorage.getItem("NOMBRECLIENTE") + "</td>" +
                    "<td width='5%' style='text-align: rigth;'><a href='#OptionPanel' class='ui-btn ui-nodisc-icon ui-shadow ui-corner-all ui-btn-icon-right ui-icon-bars ui-btn-icon-notext'></a></td>" +
                    "<td width='2%'></td>" +
                "</tr>" +
            "</table>";
    return table;
}

function GET_TOKEN(noCliente) {
    var respuesta;
    var Token = urlws + 'GET_TOKEN/nocliente/' + noCliente;

    $.ajax(
            {
                type: "GET",
                url: Token,
                data: "{}",
                timeout: 9000,
                cache: false,
                contentType: "json",
                success: function (resp) {
                    resp = $.trim(resp);
                    respuesta = resp;

                },
                async: false
            }
        );
    return respuesta;
}


function pageLoadHome() {

    $("#txtClienteDatos").html("******" + (localStorage.getItem("CLIENTE")).substring(6) + "&nbsp;&nbsp;" + localStorage.getItem("NOMBRECLIENTE"));
    $("#txtClienteNombreMenu").html(localStorage.getItem("NOMBRECLIENTE"));
    $("#txtClienteCuentaMenu").html("******" + (localStorage.getItem("CLIENTE")).substring(6));

    loadCbo();
    getMisCuentasGrid(3, 'Cuentas bancarias');
    getMisCuentasGrid(2, 'Cuentas de credito');
    getMisCuentasGrid(4, 'Inversiones');
    load('C');
    //$("#centralContent").html(c1 + '<BR/>' + c2 +'<BR/>'+c3);
}

function loadCbo() {

    var cliente = localStorage.getItem("CLIENTE");
    var GET_TOKEN = urlws + 'GET_CTAS_CBO/nocliente/' + cliente ;

    $.ajax(
            {
                type: "GET",
                url: GET_TOKEN,
                data: "{}",
                timeout: 90000,
                cache: false,
                contentType: "json",
                success: function (objRegreso) {
                    if (objRegreso == undefined) {
                        //document.getElementById('LoadingImage').style.display = 'none';
                        objRegreso = "-1";
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                    }
                    else {
                         

                        console.log('log  ' + objRegreso);
                        $("#DivcuantasMovimientosSelect").html(objRegreso);

                        //document.getElementById('cmbCuentasPropiasD-button').setAttribute('style', ' padding: 3px;font-size: 12px;');

                       // $("#DivCuentasCarga").html(objRegreso);
                            


                    }
                },
                error: function (jqXHR, exception) {

                    console.log('error  ');
                    if (jqXHR.status === 0) {
                        //document.getElementById('LoadingImage').style.display = 'none';
                        $.mobile.changePage('Error_Red.html');
                    } else if (exception === 'timeout') {
                        //document.getElementById('LoadingImage').style.display = 'none';
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                    }
                },
                async: true
            }
        );

}

function loadCboGenerales(idDivName, idCombo, nameMetodo) {

    var cliente = localStorage.getItem("CLIENTE");
    var GET_TOKEN = urlws + 'GET_CTAS_CBO/nocliente/' +cliente;

    $.ajax(
{
        type: "GET",
        url: GET_TOKEN,
        data: "{}",
        timeout: 90000,
        cache: false,
        contentType: "json",
                success: function (objRegreso) {
                    if (objRegreso == undefined) {
            //document.getElementById('LoadingImage').style.display = 'none';
                        objRegreso = "-1";
            alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
            }
            else {
                        objRegreso = objRegreso.replace('cuantasMovimientosSelect', idCombo);//id
                        objRegreso = objRegreso.replace('cboNombreSelectedValue', nameMetodo);// metodo combo
                        console.log('log : ' + objRegreso);
                        console.log('id combo : ' + idCombo);
                        
                        $("#" + idDivName).html(objRegreso);
                        if (document.getElementById('cmbCuentasPropiasO')) {
                            document.getElementById('cmbCuentasPropiasO').setAttribute('style', 'width: 100%; opacity: 1; ');

                        }
                        
                    }

                    },
                        error: function (jqXHR, exception) {

                    console.log('error  ');
                    if(jqXHR.status === 0) {
                        //document.getElementById('LoadingImage').style.display = 'none';
                        $.mobile.changePage('Error_Red.html');
                        } else if(exception === 'timeout') {
                        //document.getElementById('LoadingImage').style.display = 'none';
                            alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html');
                            return;
                         }
                   },
                async: true
                }
        );

}

function loadCboTerceros(idDivName, idCombo, nameMetodo) {

    var cliente = localStorage.getItem("CLIENTE");
    var GET_TOKEN = urlws + 'GET_CTAS_CBO/nocliente/' + cliente;

    $.ajax(
    {
        type: "GET",
                url: GET_TOKEN,
            data: "{}",
            timeout: 90000,
            cache: false,
            contentType: "json",
            success: function (objRegreso) {
                    if (objRegreso == undefined) {
                        //document.getElementById('LoadingImage').style.display = 'none';
                        objRegreso = "-1";
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                        }
                    else {

                            objRegreso = objRegreso.replace('cuantasMovimientosSelect', idCombo);//id
                            objRegreso = objRegreso.replace('cboNombreSelectedValue', nameMetodo);// metodo combo
                            console.log('log : ' +objRegreso);
                            console.log('id combo : ' +idCombo);

                            $("#" +idDivName).html(objRegreso);
                            if (document.getElementById('cmbCuentasTercerosO')) {
                                
                                document.getElementById('cmbCuentasTercerosO').setAttribute('style', 'width: 100%; opacity: 1; ');
                            }
                             //style al cbo Destino de terceros
                            document.getElementById('cmbCuentasTercerosD-button').setAttribute('style', ' padding: 3px;font-size: 12px;');

                          }

                      },
                error: function(jqXHR, exception) {

                    console.log('error  ');
                    if(jqXHR.status === 0) {
                        //document.getElementById('LoadingImage').style.display = 'none';
                        $.mobile.changePage('Error_Red.html');
                        } else if(exception === 'timeout') {
                        //document.getElementById('LoadingImage').style.display = 'none';
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                        }
                        },
                            async: true
                        }
        );
}

function loadCboOtros(idDivName, idCombo, nameMetodo) {

    var cliente = localStorage.getItem("CLIENTE");
    var GET_TOKEN = urlws + 'GET_CTAS_CBO/nocliente/' + cliente;

    $.ajax(
    {
        type: "GET",
        url: GET_TOKEN,
        data: "{}",
        timeout: 90000,
        cache: false,
        contentType: "json",
        success: function (objRegreso) {
            if (objRegreso == undefined) {
                //document.getElementById('LoadingImage').style.display = 'none';
                objRegreso = "-1";
                alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
            }
            else {

                objRegreso = objRegreso.replace('cuantasMovimientosSelect', idCombo);//id
                objRegreso = objRegreso.replace('cboNombreSelectedValue', nameMetodo);// metodo combo
                console.log('log : ' + objRegreso);
                console.log('id combo : ' + idCombo);

                $("#" + idDivName).html(objRegreso);
                if (document.getElementById('cmbCuentasOtrosO')) {

                    document.getElementById('cmbCuentasOtrosO').setAttribute('style', 'width: 100%; opacity: 1; ');
                }
                //style al cbo Destino de terceros
                //document.getElementById('cboCuentasTercerosDestino').setAttribute('style', ' padding: 3px;font-size: 12px;');

            }

        },
        error: function (jqXHR, exception) {

            console.log('error  ');
            if (jqXHR.status === 0) {
                //document.getElementById('LoadingImage').style.display = 'none';
                $.mobile.changePage('Error_Red.html');
            } else if (exception === 'timeout') {
                //document.getElementById('LoadingImage').style.display = 'none';
                alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
            }
        },
        async: true
    }
        );
}

function construccionCombo() {
    // cmbCuentasPropiasD
    document.getElementById('cmbCuentasPropiasD').innerHTML = '';
    var tope = document.getElementById('cmbCuentasPropiasO').length;




    var t = document.getElementById("cmbCuentasPropiasO");//origen
    var selectedText = t.options[t.selectedIndex].text;
    var selectedValue = t.options[t.selectedIndex].value;


    for (var ini = 0; ini < tope; ini++) {
        console.log('variable statica ' + selectedText);
        console.log('variable ini' + document.getElementById('cmbCuentasPropiasO')[ini].text);

        if (selectedText != document.getElementById('cmbCuentasPropiasO')[ini].text) {


            if (ini == '0') {
                addDatosInfoSelect('cmbCuentasPropiasD', document.getElementById('cmbCuentasPropiasO')[ini].text, '0');
            } else {
                addDatosInfoSelect('cmbCuentasPropiasD', document.getElementById('cmbCuentasPropiasO')[ini].text, document.getElementById('cmbCuentasPropiasO')[ini].value);
            }


        }

    }
}

function construccionComboTerceros() {
        //document.getElementById('cmbCuentasTercerosD').innerHTML = '';
        //var tope = document.getElementById('cmbCuentasTercerosO').length;
        //var t = document.getElementById("cmbCuentasTercerosO");//origen
        //var selectedText = t.options[t.selectedIndex].text;
        //var selectedValue = t.options[t.selectedIndex].value;
        //for (var ini = 0; ini < tope; ini++) {
        //    console.log('variable statica ' + selectedText);
        //    console.log('variable ini' + document.getElementById('cmbCuentasTercerosO')[ini].text);

        //    if (selectedText != document.getElementById('cmbCuentasTercerosO')[ini].text) {
        //        if (ini == '0') {
        //            addDatosInfoSelect('cmbCuentasTercerosD', document.getElementById('cmbCuentasTercerosO')[ini].text, '0');
        //        } else {
        //            addDatosInfoSelect('cmbCuentasTercerosD', document.getElementById('cmbCuentasTercerosO')[ini].text, document.getElementById('cmbCuentasTercerosO')[ini].value);
        //        }
        //    }
        
        //}
}


function load(content) {

        $('#lblCuentas').css('color', 'gray');
        $('#lblPagos').css('color', 'gray');
        $('#lblTraspasos').css('color', 'gray');
        $('#lblCreditos').css('color', 'gray');
        $('#lblInversiones').css('color', 'gray');
        $('#lblAdministra').css('color', 'gray');


    switch (content) {
        case 'C': $("#content").html("<strong style='font-size: 18px;'>Mis cuentas</strong>"); $('#lblCuentas').css('color', 'blue'); break;
        case 'P': $("#content").html("<strong style='font-size: 18px;'>Pagos</strong>"); $('#lblPagos').css('color', 'blue'); break;
        case 'T': $("#content").html("<strong style='font-size: 18px;'>Transferencias</strong>"); $('#lblTraspasos').css('color', 'blue'); break;
        case 'CC': $("#content").html("<strong style='font-size: 18px;'>Creditos</strong>"); $('#lblCreditos').css('color', 'blue'); break;
        case 'I': $("#content").html("<strong style='font-size: 18px;'>Inversiones</strong>"); $('#lblInversiones').css('color', 'blue'); break;
        case 'A': $("#content").html("<strong style='font-size: 18px;'>Administra</strong>"); $('#lblAdministra').css('color', 'blue'); break;
    }
}

function openPanel() {
    //document.getElementById('mymenu').setAttribute('style', 'display:block;');
}


function closePanel() {
    //$("#mymenu").panel("close");
    // $("[data-role=panel]").panel("close");
    ///document.getElementById('mymenu').setAttribute('style', 'display:none');
}


function addDatosInfoSelect(id, texto, value) {
    var x = document.getElementById(id);
    var options = document.createElement('option');
    options.text = texto;
    options.value = value;
    x.add(options);

}

//function rowSelected(idProducto, descCuenta, cliente, cuenta, cuentaFormateada) {
function rowSelected(obj, producto, cliente, cuenta) {
    //page load movimientos
    localStorage.setItem("CLIENTE", cliente);
    localStorage.setItem("cuenta", cuenta);


    var fields = obj.innerText.split('-');

    var strCuenta = fields[0];
    var strSaldo = fields[1];
    
    $('#tabMov').click();

    console.log('lblCuentaSelectedMovs:  ' + strCuenta);
    //$("#lblCuentaSelectedMovs").html(strCuenta);
    

    //just select
   // $("#lblCuentaSelectedMovs").select.
    //var x1 = document.getElementById('cuantasMovimientosSelect');
    //e.options.selected(cuenta);

    if ($("#cuantasMovimientosSelect").val(cuenta)) {
        $("#cuantasMovimientosSelect option[value="+cuenta +"]").attr("selected", true);
    } else
    {
        $("#cuantasMovimientosSelect option[value=" + cuenta + "]").attr("selected", false);
    }
    

    
    $("#lblSaldoDisponibleMovs").html(strSaldo);

    //lblClabeMovs
    getMisMovs(cliente,cuenta,10);
    getDatosCuentaMovs(cliente,cuenta);


    document.getElementById('cboPeriodosMovs-button').setAttribute('style', 'padding: 3px; font-size: 12px;');

}

function ConsultaMovimiento() {

    document.getElementById('cboPeriodosMovs-button').setAttribute('style', 'padding: 3px; font-size: 12px;');
}

function ConsultaClabe() {


    var GET_MOVIMIENTOS = urlws + "GET_CTAS_CLABE/nocliente/" + localStorage.CLIENTE;

             //alert(GET_MOVIMIENTOS);
             $.ajax(
    {
        type : "GET",
    url: GET_MOVIMIENTOS,
    data: "{}",
        timeout: 90000,
            cache: false,
            contentType: "json",
            success: function (objRegreso) {
                    if (objRegreso == undefined) {
            //document.getElementById('LoadingImage').style.display = 'none';
            objRegreso = "-1";
            }

                    console.log('rere   '+objRegreso);
                    $("#DivCuentaClabe").html(objRegreso);
        return;
            },
                error: function (jqXHR, exception) {
        if (jqXHR.status === 0) {
            document.getElementById('LoadingImage').style.display = 'none';
                        $.mobile.changePage('Error_Red.html');
                        } else if (exception === 'timeout') {
                        document.getElementById('LoadingImage').style.display = 'none';
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                        }
                        },
                            async: true
                            }
                    );
}
     
function getDatosCuentaMovs(cliente, cuenta) {
    //lblSaldoDispMovs lblSaldoBuenCobroMovs lblClabeMovs
     var GET_MOVIMIENTOS = urlws + "GetCuentaClabe/nocliente/"+cliente+"/cuenta/"+cuenta;
         
    //alert(GET_MOVIMIENTOS);
    $.ajax(
            {
                type: "GET",
                url: GET_MOVIMIENTOS,
                data: "{}",
                timeout: 90000,
                cache: false,
                contentType: "json",
                success: function (objRegreso) {
                    if (objRegreso == undefined) {
                        //document.getElementById('LoadingImage').style.display = 'none';
                        objRegreso = "-1";
                    }

                    //document.getElementById('LoadingImage').style.display = 'none';
                      //document.getElementById("divMisMovimientos").innerHTML = "";
                 //document.getElementById("divMisMovimientos").style.overflowX = "scroll";
                    //document.getElementById("divMisMovimientos").style.overflowY = "scroll";
                     //document.getElementById("divMisMovimientos").innerHTML = objRegreso;
                    // alert(objRegreso);
                    console.log(objRegreso);
                    $("#lblClabeMovs").html(objRegreso);
                    return;
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        document.getElementById('LoadingImage').style.display = 'none';
                        $.mobile.changePage('Error_Red.html');
                    } else if (exception === 'timeout') {
                        document.getElementById('LoadingImage').style.display = 'none';
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                    }
                },
                async: true
            }
        );

}

function getMovimientos() {
    var noDias = $('#cboPeriodosMovs').val();
    console.log('noDias--->' +noDias);
    getMisMovs(localStorage.getItem("CLIENTE"), localStorage.getItem("cuenta"), noDias);
  

}

function cboNombreSelectedValue(obj) {
    //alert(obj.value);

    localStorage.setItem("cuenta", obj.value);
     document.getElementById('cboPeriodosMovs').selectedIndex = "0";
    document.getElementById('cboPeriodosMovs-button').setAttribute('style', 'padding: 3px; font-size: 12px;');
    getMovimientos();

}

//inicia cuentas propias

//Transpasos entre cuentas propias
function iniciaCuentasPropias() {

    loadCboGenerales('DivCuentasCarga', 'cmbCuentasPropiasO', 'construccionCombo');
    cleanTransferencias();
}

function soloNumeros(e) {
    var key = window.Event ? e.which : e.keyCode
    return (key >= 48 && key <= 57 || event.keyCode == 46)

    
}

function validar(frm) {
  if(frm.txt.value.length!=9) {
    alert('error');
    frm.txt.focus();
    }
}

var bndAceptarEnvio = '0';
var bndAceptarEnvio3o = '0';
var bndAceptarEnvioOtros = '0';

function confirmarCuentas() {

    if (bndAceptarEnvio == '1') {
        bndAceptarEnvio = '0';
        transferenciaCtasPropias(event);
        return;
    }

    bndAceptarEnvio = '1';
/////llenado para la tabla desde los campos llenados
    document.getElementById("DivDescriCorta2").innerHTML = document.getElementById("txtDescriCorta").value;
    document.getElementById("DivReferencia2").innerHTML = document.getElementById("txtReferencia").value;
    var t = document.getElementById("cmbCuentasPropiasO");//origen
    var selectedText1 = t.options[t.selectedIndex].value;
    selectedText1 = '*****' + selectedText1.substring(selectedText1.length - 4, selectedText1.length);
    document.getElementById("DivCuentasCarga2").innerHTML = selectedText1;
    var t2 = document.getElementById("cmbCuentasPropiasD");//origen
    var selectedText2 = t2.options[t2.selectedIndex].value;
    selectedText2='*****'+selectedText2.substring(selectedText2.length -4, selectedText2.length);
    document.getElementById("DivcmbCuentasPropiasD2").innerHTML = selectedText2;
    document.getElementById("DivImporte2").innerHTML = "$"+document.getElementById("txtImporte").value;
    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
    var f=new Date();
    var fehcaa=  f.getDate() + "/" +f.getMonth() + "/" + f.getFullYear();
    document.getElementById("DivFechaa2").innerHTML = fehcaa;
//////fin de llenado


    document.getElementById("formaTablaUno").setAttribute('style', 'display:none;');
    document.getElementById("formaTablaSegunda").setAttribute('style', 'padding:14px;margin-top: 6%;margin-left: 0%;font-size: 13px;table-layout:fixed;width:100%;')

  


     
     //document.getElementById("DivDescriCorta2").setAttribute('style', 'display:block;');
     //document.getElementById("DivReferencia2").setAttribute('style', 'display:block;');
     //document.getElementById("DivCuentasCarga2").setAttribute('style', 'display:block;');
     //document.getElementById("DivcmbCuentasPropiasD2").setAttribute('style', 'display:block;');
     //document.getElementById("DivImporte2").setAttribute('style', 'display:block;');


}

function confirmarCuentasTerceros() {
    
    if (bndAceptarEnvio3o == '1') {
        bndAceptarEnvio3o = '0';
        transferenciaCtasTerceros(event);
        return;
    }

    bndAceptarEnvio3o = '1';
    /////llenado para la tabla desde los campos llenados
    document.getElementById("DivDescriCorta2Terceros").innerHTML = document.getElementById("txtDescriCortaTerceros").value;
    document.getElementById("DivReferencia2Terceros").innerHTML = document.getElementById("txtReferenciaTerceros").value;
    var t = document.getElementById("cmbCuentasTercerosO");//origen
    var selectedText1 = t.options[t.selectedIndex].value;
    selectedText1 = '*****' + selectedText1.substring(selectedText1.length - 4, selectedText1.length);
    document.getElementById("DivCuentasCarga2Terceros").innerHTML = selectedText1;

    var t2 = document.getElementById("cboCuentasTercerosDestino");//origen
    var selectedText2 = t2.options[t2.selectedIndex].value;
    console.log(selectedText2);
    selectedText2 = '*****' + selectedText2.substring(selectedText2.length - 4, selectedText2.length);
    document.getElementById("DivcmbCuentasTercerosD2").innerHTML = selectedText2;
    document.getElementById("DivImporte2Terceros").innerHTML = document.getElementById("txtImporteTerceros").value;
    var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    var diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
    var f = new Date();
    var fehcaa = f.getDate() + "/" + f.getMonth() + "/" + f.getFullYear();
    document.getElementById("DivFechaa2Terceros").innerHTML = fehcaa;
    //////fin de llenado


    document.getElementById("formaTablaUnoTerceros").setAttribute('style', 'display:none;');
    document.getElementById("formaTablaSegundaTerceros").setAttribute('style', 'padding:14px;margin-top: 6%;margin-left: 0%;font-size: 13px;table-layout:fixed;width:100%;')





}


function confirmarCuentasOtros() {

    if (bndAceptarEnvioOtros == '1') {
        bndAceptarEnvioOtros = '0';
        transferenciaCtasOtros(event);
        return;
    }

    bndAceptarEnvioOtros = '1';
    /////llenado para la tabla desde los campos llenados
    document.getElementById("DivDescriCorta2Otros").innerHTML = document.getElementById("txtDescriCortaOtros").value;
    document.getElementById("DivReferencia2Otros").innerHTML = document.getElementById("txtReferenciaOtros").value;
    var t = document.getElementById("cmbCuentasOtrosO");//origen
    var selectedText1 = t.options[t.selectedIndex].value;
    selectedText1 = '*****' + selectedText1.substring(selectedText1.length - 4, selectedText1.length);
    document.getElementById("DivCuentasCarga2Otros").innerHTML = selectedText1;

    var t2 = document.getElementById("cboCuentasOtrosDestino");//origen
    var selectedText2 = t2.options[t2.selectedIndex].value;
    console.log(selectedText2);
    selectedText2 = '*****' + selectedText2.substring(selectedText2.length - 4, selectedText2.length);
    document.getElementById("DivcmbCuentasOtrosD2").innerHTML = selectedText2;
    document.getElementById("DivImporte2Otros").innerHTML = document.getElementById("txtImporteOtros").value;
    var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    var diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
    var f = new Date();
    var fehcaa = f.getDate() + "/" + f.getMonth() + "/" + f.getFullYear();
    document.getElementById("DivFechaa2Otros").innerHTML = fehcaa;
    //////fin de llenado


    document.getElementById("formaTablaUnoOtros").setAttribute('style', 'display:none;');
    document.getElementById("formaTablaSegundaOtros").setAttribute('style', 'padding:14px;margin-top: 6%;margin-left: 0%;font-size: 13px;table-layout:fixed;width:100%;')





}

function CancelarCuentas() {
    bndAceptarEnvio = '0';
    document.getElementById("formaTablaSegunda").setAttribute('style', 'display:none;');
    document.getElementById("formaTablaUno").setAttribute('style', '');//display:block;
}

function enabletablaTransfPropias() {//
    var goHome = false;
    
    if (bndAceptarEnvio == '0') goHome = true;

    document.getElementById("formaTablaSegunda").setAttribute('style', 'display:none;');
    document.getElementById("formaTablaUno").setAttribute('style', 'padding:14px;margin-top: 6%;margin-left: 0%;font-size: 13px;table-layout:fixed;width:100%;');
    bndAceptarEnvio = '0';

    if (goHome == true) goto('BancaMovil.html');
}


function CancelarCuentasTerceros() {
    bndAceptarEnvio3o = '0';
    document.getElementById("formaTablaSegundaTerceros").setAttribute('style', 'display:none;');
    document.getElementById("formaTablaUnoTerceros").setAttribute('style', '');//display:block;
}

function cleanTransferencias() {

    if (document.getElementById("formaTablaSegunda")) {
        document.getElementById("formaTablaSegunda").setAttribute('style', 'display:none;');
        document.getElementById("formaTablaUno").setAttribute('style', 'table-layout: fixed;width: 100%;');
    }
    
    document.getElementById("txtDescriCorta").value='';
    document.getElementById("txtReferencia").value = '';
    if (document.getElementById("cmbCuentasPropiasO")) {
        document.getElementById("cmbCuentasPropiasO").selectedIndex = '0';
    }
  
    document.getElementById("cmbCuentasPropiasD").innerHTML='';
   document.getElementById("txtImporte").value='';


}

function transferenciaCtasPropias(event) {


    var origen = document.getElementById('cmbCuentasPropiasO').value;
    var destino = document.getElementById('cmbCuentasPropiasD').value;
    var monto = document.getElementById('txtImporte').value;
    var descripcionCorta = document.getElementById('txtDescriCorta').value;
    var referencia= document.getElementById('txtReferencia').value;

    var GET_MOVIMIENTOS = urlws + 'HB_Traspaso/user/TOP/cve/1234567/nocliente/' + localStorage.getItem("CLIENTE") + '/producto/123/ctaOrigen/' + origen + '/ctaDestino/' + destino + '/monto/' + monto + '/cargo/0/concepto/' + descripcionCorta + '/referencia/1122334';
    console.log("input "+GET_MOVIMIENTOS);
    //alert(GET_MOVIMIENTOS);
    $.ajax(
{
    type: "GET",
    url: GET_MOVIMIENTOS,
    data: "{}",
    timeout: 90000,
    cache: false,
    contentType: "json",
    success: function (objRegreso) {
        if (objRegreso == undefined) {
            //document.getElementById('LoadingImage').style.display = 'none';
            objRegreso = "-1";
        }

        
        ///////Proceso validacion
        
        console.log("output   " + objRegreso);
        var temp = new Array();
        temp = objRegreso.split('|');

        if (temp[0] == '0') {
            document.getElementById('closeAlert').setAttribute('onclick', 'gotoHome()');
            document.getElementById('contenidoModal').innerHTML = 'Su transferencia se a realizado con exito.(' + temp[1] + ')';
            $('#alertGeneral').modal('show');
            return false;
            
        } else {
            document.getElementById('closeAlert').setAttribute('onclick', '');
            bndAceptarEnvio = '1';
            document.getElementById('contenidoModal').innerHTML = 'Fallo transaccion.(' +temp[1]+')';
            $('#alertGeneral').modal('show');
            return false;
        } 

       

        return;
    },
    error: function (jqXHR, exception) {
        if (jqXHR.status === 0) {
            document.getElementById('LoadingImage').style.display = 'none';
            $.mobile.changePage('Error_Red.html');
        } else if (exception === 'timeout') {
            document.getElementById('LoadingImage').style.display = 'none';
            alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
        }
    },
    async: true
}
           );
}


function messageBox(strFuncion,mensaje,titulo) {
    document.getElementById('closeAlert').setAttribute("onclick", strFuncion);
    document.getElementById('contenidoModal').innerHTML = mensaje;
    document.getElementById('TituloModal').innerHTML = titulo;
    $('#alertGeneral').modal('show');
}

function transferenciaCtasTerceros(event) {


    var origen = document.getElementById('cmbCuentasTercerosO').value;
    var destino = document.getElementById('cboCuentasTercerosDestino').value;
    var monto = document.getElementById('txtImporteTerceros').value;
    var descripcionCorta = document.getElementById('txtDescriCortaTerceros').value;
    var referencia = document.getElementById('txtReferenciaTerceros').value;

    //0-BANCO MODELO-esposa-70001000176
    var arrValue = destino.split('-');
     destino = arrValue[3];
     var GET_MOVIMIENTOS = urlws + 'HB_Traspaso_TercerMismo/user/TOP/cve/1234567/nocliente/' + localStorage.getItem("CLIENTE") + '/producto/123/ctaOrigen/' + origen + '/ctaDestino/' + destino + '/monto/' + monto + '/cargo/0/concepto/' + descripcionCorta + '/referencia/' + referencia;
            


    console.log('destino-->' + destino);
    console.log("input" + GET_MOVIMIENTOS);
    //alert(GET_MOVIMIENTOS);
    $.ajax(
{
    type: "GET",
    url: GET_MOVIMIENTOS,
    data: "{}",
    timeout: 90000,
    cache: false,
    contentType: "json",
    success: function (objRegreso) {
        if (objRegreso == undefined) {
            //document.getElementById('LoadingImage').style.display = 'none';
            objRegreso = "-1";
        }


        ///////Proceso validacion
       
        console.log("output -->  " + objRegreso);

      

        if (objRegreso.startsWith('Error')) {
            bndAceptarEnvio3o = '1';
            console.log('xmlnode-->' + objRegreso);
            document.getElementById('contenidoModal').innerHTML = 'Fallo transaccion.(' + objRegreso + ')';
            
            $('#alertGeneral').modal('show');
            return false;
        } else {
            document.getElementById('closeAlert').setAttribute('onclick', 'gotoHome()');
            document.getElementById('contenidoModal').innerHTML = '(' + objRegreso + ')Su transferencia se a realizado con exito.';
            $('#alertGeneral').modal('show');
            return false;
         }
      

      







        //if (objRegreso.replace('<tns:StatusTrn>0</tns:StatusTrn>','si'))

        //////Fin de validacion 

        return;
    },
    error: function (jqXHR, exception) {
        if (jqXHR.status === 0) {
            document.getElementById('LoadingImage').style.display = 'none';
            $.mobile.changePage('Error_Red.html');
        } else if (exception === 'timeout') {
            document.getElementById('LoadingImage').style.display = 'none';
            alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
        }
    },
    async: true
}
           );
}


function transferenciaCtasOtros(event) {


    var origen = document.getElementById('cmbCuentasOtrosO').value;
    var destino = document.getElementById('cboCuentasOtrosDestino').value;
    destino = '70001000113'; //cta definida para spei
    var monto = document.getElementById('txtImporteOtros').value;
    var descripcionCorta = document.getElementById('txtDescriCortaOtros').value;
    var referencia = document.getElementById('txtReferenciaOtros').value;

    //0-BANCO MODELO-esposa-70001000176
    var arrValue = destino.split('-');
    //destino = arrValue[3];
    //var JET_MOVIMIENTOS = urlws + 'HB_Traspaso_TercerMismo/user/TOP/cve/1234567/nocliente/' + localStorage.getItem("cliente") + '/producto/123/ctaOrigen/' + origen + '/ctaDestino/' + destino + '/monto/' + monto + '/cargo/0/concepto/' + descripcionCorta + '/referencia/' + referencia;
    var GET_MOVIMIENTOS = urlws + 'HB_Traspaso_SPEI/user/TOP/cve/1234567/nocliente/' + localStorage.getItem("CLIENTE") + '/producto/123/ctaOrigen/' + origen + '/ctaDestino/' + destino + '/monto/' + monto + '/cargo/0/concepto/' + descripcionCorta + '/referencia/' + referencia;

    
    console.log("input" + GET_MOVIMIENTOS);
    //alert(GET_MOVIMIENTOS);
    $.ajax(
{
    type: "GET",
    url: GET_MOVIMIENTOS,
    data: "{}",
    timeout: 90000,
    cache: false,
    contentType: "json",
    success: function (objRegreso) {
        if (objRegreso == undefined) {
            //document.getElementById('LoadingImage').style.display = 'none';
            objRegreso = "-1";
        }


        ///////Proceso validacion
       
        console.log("output -->  " + objRegreso);



        if (objRegreso.startsWith('Error')) {
            bndAceptarEnvioOtros = '1';
            console.log('xmlnode-->' + objRegreso);
            document.getElementById('contenidoModal').innerHTML = 'Fallo transaccion.(' + objRegreso + ')';

            $('#alertGeneral').modal('show');
            return false;
        } else {
             document.getElementById('closeAlert').setAttribute('onclick', 'gotoHome()');
            document.getElementById('contenidoModal').innerHTML = '(' + objRegreso + ')Su transferencia se a realizado con exito.';
            $('#alertGeneral').modal('show');
            return false;
        }



        return;
    },
    error: function (jqXHR, exception) {
        if (jqXHR.status === 0) {
            document.getElementById('LoadingImage').style.display = 'none';
            $.mobile.changePage('Error_Red.html');
        } else if (exception === 'timeout') {
            document.getElementById('LoadingImage').style.display = 'none';
            alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
        }
    },
    async: true
}
           );
}


function gotoHome() {
    location.href = 'BancaMovil.html';
}


function seguir() {

    console.log('hola');
    CancelarCuentas();
    cleanTransferencias();

}


function cambioImagen() {

    var cmbPagoServicio = document.getElementById("cmbPagosSelect");//origen
    var valuePago = cmbPagoServicio.options[cmbPagoServicio.selectedIndex].value;

    console.log('<<<<  ' + valuePago);
    if (valuePago == '0') {
        document.getElementById('imgPagos').setAttribute('src', 'images/pagos_servicios/servicios.jpg');
    }
    else if (valuePago == '1') {
        document.getElementById('imgPagos').setAttribute('src', 'images/pagos_servicios/servicios.jpg');
    }
    else if (valuePago == '2') {
        document.getElementById('imgPagos').setAttribute('src', 'images/pagos_servicios/sky.png');
    }
    else if (valuePago == '3') {
        document.getElementById('imgPagos').setAttribute('src', 'images/pagos_servicios/CFE.png');
    }
    


}


Date.prototype.isValid = function () {
    // An invalid date object returns NaN for getTime() and NaN is the only
    // object not strictly equal to itself.
    return this.getTime() === this.getTime();
};

////////////////////
//Pagos de servicios
var bndPagoServicio, bndPagoCredito = '0';
function cancelacionPagoServicio() {
    bndPagoServicio = '0';
    document.getElementById("TablaSegundaPagoServicios").setAttribute('style', 'display:none;');
    document.getElementById("tablaPagosServicios").setAttribute('style', 'display:block;');
}

function cancelacionPagoCredito() {
    //alert(bndPagoCredito);
    var goHome = false;//bndAceptarEnvio3o
    if (bndPagoCredito == '0') goHome = true;

    document.getElementById("TablaSegundaPagoCreditos").setAttribute('style', 'display:none;');
    document.getElementById("tablaPagosCreditos").setAttribute('style', 'padding:14px;margin-top: 6%;margin-left: 0%;font-size: 13px;table-layout:fixed;width:100%;');
    bndPagoCredito = '0';

    if (goHome == true) goto('BancaMovil.html');//$.mobile.changePage('#frmMisCuentas');
}

function validaPagarServicios() {
    //DivPagoServicioDescripcion  DivPagoServicioReferencia DivPagoServiciosDesCorta  DivPagoServicioCuentaCargo DivPagoServiciosImporte

    //pagosServicios(event)
    //alert("bndPagoServicio-->" + bndPagoServicio);
    if (bndPagoServicio == '1') {
        bndPagoServicio = '0';
        pagosServicios(event);
    }

    bndPagoServicio = '1';
    /////llenado para la tabla desde los campos llenados
    var t = document.getElementById("cmbPagosSelect");//origen
    var selectedText1 = t.options[t.selectedIndex].text;
    document.getElementById("DivPagoServicioDescripcion").innerHTML = selectedText1;
    document.getElementById("DivPagoServicioReferencia").innerHTML = document.getElementById("txtReferenciaPG").value;
    document.getElementById("DivPagoServiciosDesCorta").innerHTML = document.getElementById("txtCuentaDescripcionPG").value;

    var t2 = document.getElementById("cmbCuentasPropiasServicios");//origen
    var selectedText2 = t2.options[t2.selectedIndex].value;
    document.getElementById("DivPagoServicioCuentaCargo").innerHTML = selectedText2;
    document.getElementById("DivPagoServiciosImporte").innerHTML = "$"+document.getElementById("txtImportePG").value;
    ///// fin de llenado 


    document.getElementById("tablaPagosServicios").setAttribute('style', 'display:none;');
    document.getElementById("TablaSegundaPagoServicios").setAttribute('style', 'padding:14px;margin-top: 6%;margin-left: 0%;font-size: 13px;table-layout:fixed;width:100%;')



}


function validaPagarCreditos() {
    //DivPagoServicioDescripcion  DivPagoServicioReferencia DivPagoServiciosDesCorta  DivPagoServicioCuentaCargo DivPagoServiciosImporte

    //pagosServicios(event)
    //alert("bndPagoServicio-->" + bndPagoServicio);
    if (bndPagoCredito == '1') {
        bndPagoCredito = '0';
        pagosCreditos(event);
        return;
    }

    bndPagoCredito = '1';
    /////llenado para la tabla desde los campos llenados
    var t = document.getElementById("cboCuentasCreditos");//origen
    var selectedText1 = t.options[t.selectedIndex].text;
    var slcvalorsplit = selectedText1.split("-");

    document.getElementById("DivCuentaPagoCredito").innerHTML = slcvalorsplit[1];

    var t2 = document.getElementById("cmbCuentasPagoCreditos");//origen
    var selectedText2 = t2.options[t2.selectedIndex].value;
    console.log(selectedText2.length - 4);
    document.getElementById("DivCuentaOrigenPagoCredito").innerHTML = '*******' + selectedText2.substring((selectedText2.length - 4));

    document.getElementById("DivPagocreditosCuentaOrigen").innerHTML = '*******' + document.getElementById("DivLBLCuentaPagoCredito").innerHTML.substring((document.getElementById("DivLBLCuentaPagoCredito").innerHTML.length - 4));;
    document.getElementById("DivPagoCreditoImporte").innerHTML = '$' + document.getElementById("txtImporteCredito").value.toLocaleString();

    ///// fin de llenado 


    document.getElementById("tablaPagosCreditos").setAttribute('style', 'display:none;');
    document.getElementById("TablaSegundaPagoCreditos").setAttribute('style', 'padding:14px;margin-top: 6%;margin-left: 0%;font-size: 13px;table-layout:fixed;width:100%;')



}

function enabletablaPagosServicios() {
    //alert(bndPagoServicio);
    var goHome = false;//bndAceptarEnvio3o
    if (bndPagoServicio == '0') goHome = true;

    document.getElementById("TablaSegundaPagoServicios").setAttribute('style', 'display:none;');
    document.getElementById("tablaPagosServicios").setAttribute('style', 'padding:14px;margin-top: 6%;margin-left: 0%;font-size: 13px;table-layout:fixed;width:100%;');
    bndPagoServicio = '0';

    if (goHome == true) goto('BancaMovil.html');//$.mobile.changePage('#frmMisCuentas');

}

function enabletablaTransfTerceros() {//
    var goHome = false;
    if (bndAceptarEnvio3o == '0') goHome = true;

    document.getElementById("formaTablaSegundaTerceros").setAttribute('style', 'display:none;');
    document.getElementById("formaTablaUnoTerceros").setAttribute('style', 'padding:14px;margin-top: 6%;margin-left: 0%;font-size: 13px;table-layout:fixed;width:100%;');
    bndAceptarEnvio3o = '0';

    if (goHome == true) goto('BancaMovil.html');
}


function enabletablaTransfOtros() {//
    var goHome = false;
    if (bndAceptarEnvioOtros == '0') goHome = true;

    document.getElementById("formaTablaSegundaOtros").setAttribute('style', 'display:none;');
    document.getElementById("formaTablaUnoOtros").setAttribute('style', 'padding:14px;margin-top: 6%;margin-left: 0%;font-size: 13px;table-layout:fixed;width:100%;');
    bndAceptarEnvioOtros = '0';

    if (goHome == true) goto('BancaMovil.html');
}




    function cleanPagosServicios() {


}

    function compraCEDES() {


        console.log('----'+document.getElementById("cboProductosCEDEs").value);
        if(document.getElementById("cboProductosCEDEs").value == '0') {
            messageBox('dummy()', 'Debe seleccionar un producto', 'Stefanini');
            return;
        }

        if (document.getElementById("cboPlazosCEDEs").value == '0') {
            messageBox('dummy()', 'Debe seleccionar un plazo', 'Stefanini');
            return;
        }

        //if (document.getElementById("cboPeriodicidadCEDEs").value == '0') {
        //    messageBox('dummy()', 'Debe seleccionar una periodicidad', 'Stefanini');
        //    return;
        //}

        if (document.getElementById("cboMonedasCEDEs").value == '0') {
            messageBox('dummy()', 'Debe seleccionar una moneda', 'Stefanini');
            return;
        }
        
        if (document.getElementById("cmbCuentasCEDEO").value == '0') {
            messageBox('dummy()', 'Debe seleccionar una cuenta de cargo', 'Stefanini');
            return;
        }

        if (document.getElementById("txtImporteCEDEs").value == '' || document.getElementById("txtImporteCEDEs").value == '0') {
            messageBox('dummy()', 'Debe ingresar un monto v&aacute;lido', 'Stefanini');
            return;
        }
        
        if (document.getElementById("cboInstruccionesVCEDEs").value == '0' ) {
            messageBox('dummy()', 'Debe ingresar una instrucci&oacute;n de vencimiento', 'Stefanini');
            return;
        }
        
        if (parseFloat(IMPORTE) <= 0) {
            messageBox('dummy()', 'Debe ingresar un monto v&aacute;lido', 'Stefanini');
            return;
        }

        //-------------------Saldo-----------------------------------------------
        var skillsSelect = document.getElementById("cmbCuentasCEDEO");
        var selectedText = skillsSelect.options[skillsSelect.selectedIndex].text;

        var arrCbo = selectedText;
        //var arrCbo = $('#cmbCuentasCEDEO').value;
        //Seleccionar...
        console.log(arrCbo);
        var arrItems = arrCbo.split('-')
        var SALDO = arrItems[1].replace("Saldo: $ ", "").replace(",", "");
        SALDO = SALDO.replace('$', '');
        SALDO = SALDO.replace('Saldo:', '');
       //---------------------Cuenta origen-------------------------------------------------
        var CTA_ORIGEN = document.getElementById("cmbCuentasCEDEO").value; //$('#cmbCuentasCEDEO').value;
                             
        console.log('CTA_ORIGEN--->' + CTA_ORIGEN);
        //----------------------Importe------------------------------------------------------
        var IMPORTE = document.getElementById("txtImporteCEDEs").value;
 

        console.log(IMPORTE + '---' + SALDO);
        if (parseFloat(IMPORTE) > parseFloat(SALDO)) {
            console.log('saldo insuficiente....');
            messageBox('dummy()', 'saldo insuficiente....', 'Stefanini');
            return;
        } else {
            console.log('saldo ok....');

            compraCEDEWS(CTA_ORIGEN, document.getElementById("cboProductosCEDEs").value, document.getElementById("cboPlazosCEDEs").value, document.getElementById("cboPeriodicidadCEDEs").value, document.getElementById("cboInstruccionesVCEDEs").value, IMPORTE, document.getElementById("cboMonedasCEDEs").value);

            //messageBox('dummy()', 'saldo ok....', 'Stefanini');
            return;
        }



    console.log(saldox);
    }


    function pagosServicios(event) {


    var origen = document.getElementById('cmbCuentasPropiasServicios').value;
    var destino = '3000000000000';

    var cmbPagoServicio = document.getElementById("cmbPagosSelect");
    var valuePago = cmbPagoServicio.options[cmbPagoServicio.selectedIndex].value;//se convierte en cuenta destino en el servicio web
    console.log("cta destino:" + valuePago);
    if (valuePago == '1') valuePago = '70001000112';
    if (valuePago == '2') valuePago = '70001000113';
    if (valuePago == '3') valuePago = '70001000114';

    var monto = document.getElementById('txtImportePG').value;

    var descripcionCorta = document.getElementById('txtCuentaDescripcionPG').value;
    var referencia = document.getElementById('txtReferenciaPG').value;
    console.log("clientex--->" + localStorage.getItem("CLIENTE"));
    var GET_MOVIMIENTOS = urlws + 'HB_Traspaso/user/TOP/cve/1234567/nocliente/' + localStorage.getItem("CLIENTE") + '/producto/123/ctaOrigen/' + origen + '/ctaDestino/' + valuePago + '/monto/' + monto + '/cargo/0/concepto/' + descripcionCorta + '/referencia/' + referencia;
    console.log("input-->" +GET_MOVIMIENTOS);
        //alert(GET_MOVIMIENTOS);
    $.ajax(
{
        type: "GET",
        url: GET_MOVIMIENTOS,
        data: "{}",
        timeout: 90000,
        cache: false,
        contentType: "json",
        success: function (objRegreso) {
        if (objRegreso == undefined) {
            //document.getElementById('LoadingImage').style.display = 'none';
            objRegreso = "-1";
        }


            ///////Proceso validacion

        document.getElementById('closeAlert').setAttribute('onclick', 'serviciosPagarCerrar');
        console.log("Pago de servicios   " +objRegreso);
        var temp = new Array();
        temp = objRegreso.split('|');

        if (temp[0] == '0') {
            //document.getElementById('contenidoModal').innerHTML = 'Su transferencia se a realizado con exito.(' + temp[1]+ ')';
            //$('#alertGeneral').modal('show');
            messageBox('cleanFormPago()', 'Su transferencia se a realizado con exito.(' + temp[1] + ')', 'Stefanini');
            return false;

        } else {
            messageBox('dummy()', 'Fallo transaccion.(' + temp[1] + ')', 'Stefanini');
            //document.getElementById('contenidoModal').innerHTML = 'Fallo transaccion.(' + temp[1]+ ')';
            //$('#alertGeneral').modal('show');
            return false;
        }




            return;
},
        error: function (jqXHR, exception) {
        if (jqXHR.status === 0) {
            document.getElementById('LoadingImage').style.display = 'none';
            $.mobile.changePage('Error_Red.html');
        } else if (exception === 'timeout') {
            document.getElementById('LoadingImage').style.display = 'none';
            alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
        }
},
        async: true
    }
               );
    }

    function pagosCreditos(event) {

        console.log('pago credito click');
        var origen = document.getElementById('cmbCuentasPagoCreditos').value;
        var destino = document.getElementById('DivLBLCuentaPagoCredito').innerHTML;
        var importe = document.getElementById("txtImporteCredito").value;

        var GET_MOVIMIENTOS = urlws + 'HB_Pago_Credito/ctaOrigen/' + origen + '/ctaDestino/' + destino + '/monto/' + importe;
      
        console.log(GET_MOVIMIENTOS);
        $.ajax(
    {
        type: "GET",
        url: GET_MOVIMIENTOS,
        data: "{}",
        timeout: 90000,
        cache: false,
        contentType: "json",
        success: function (objRegreso) {
            if (objRegreso == undefined) {
                //document.getElementById('LoadingImage').style.display = 'none';
                objRegreso = "-1";
            }


            console.log("Pago de credito   " + objRegreso);
           
            messageBox('cleanFormPagoCredito()', objRegreso, 'Stefanini');
               return;

            //} else {
            //    messageBox('dummy()', 'Fallo transaccion.(' + temp[1] + ')', 'Stefanini');
            //    //document.getElementById('contenidoModal').innerHTML = 'Fallo transaccion.(' + temp[1]+ ')';
            //    //$('#alertGeneral').modal('show');
            //    return false;
            //}




            //return;
        },
        error: function (jqXHR, exception) {
            if (jqXHR.status === 0) {
                document.getElementById('LoadingImage').style.display = 'none';
                $.mobile.changePage('Error_Red.html');
            } else if (exception === 'timeout') {
                document.getElementById('LoadingImage').style.display = 'none';
                alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
            }
        },
        async: true
    }
                   );
    }



    function cleanFormPago() {
        console.log('cleanning form....');
        
        enabletablaPagosServicios();
        document.getElementById("txtCuentaDescripcionPG").value = '';
        document.getElementById("txtReferenciaPG").value = '';
        document.getElementById("txtImportePG").value = '';
        console.log('end cleanning form....');
        
    }

    function cleanFormPagoCredito() {
        console.log('cleanning form....');
        $("#cboCuentasPagoCreditos").html('');
        document.getElementById("txtImporteCredito").value = '';
       gotoHome();

    }

    //function creditosPagarCerrar() {
    //    gotoHome();
    //}
    //Fin de pagos de servicios
    ///////////////////////////

    function iniciaCuentasTerceros() {

    loadCboTerceros('DivCuentasCargaTerceros', 'cmbCuentasTercerosO', 'construccionComboTerceros');
        loadCboTercerosD();
        cleanTransferenciasTerceros();
    }

    function iniciaCuentasOtros() {
        loadCboOtros('DivCuentasCargaOtros', 'cmbCuentasOtrosO', 'construccionComboOtros');
        loadCboOtrosD();
        cleanTransferenciasOtros();
    }

    function iniciaCompraCEDE() {
        load('I');
        //carga cbo productos
        loadCboProductosCEDE();

        $("#divCboPlazosCEDE").html('');
        $("#divCboPeriodicidadCEDE").html('');
        $("#divInstruccionesCEDE").html('');
        $("#divCboMonedasCEDE").html('');

        //carga cbo cuentas
        loadCboCuentasCEDE('divCboCuentasCargoCEDE', 'cmbCuentasCEDEO', 'dummy');
    }

    function loadCboCuentasCEDE(idDivName, idCombo, nameMetodo) {
        //divCboCuentasCargoCEDE
        var cliente = localStorage.getItem("CLIENTE");
        var GET_TOKEN = urlws + 'GET_CTAS_CBO/nocliente/' + cliente;

        $.ajax(
    {
        type: "GET",
        url: GET_TOKEN,
        data: "{}",
        timeout: 90000,
        cache: false,
        contentType: "json",
        success: function (objRegreso) {
            if (objRegreso == undefined) {
                //document.getElementById('LoadingImage').style.display = 'none';
                objRegreso = "-1";
                alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
            }
            else {
                objRegreso = objRegreso.replace('cuantasMovimientosSelect', idCombo);//id
                objRegreso = objRegreso.replace('cboNombreSelectedValue', nameMetodo);// metodo combo
                console.log('log : ' + objRegreso);
                console.log('id combo : ' + idCombo);

                $("#" + idDivName).html(objRegreso);
                //if (document.getElementById('cmbCuentasPropiasO')) {
                //    document.getElementById('cmbCuentasPropiasO').setAttribute('style', 'width: 100%; opacity: 1; ');

                //}

            }

        },
        error: function (jqXHR, exception) {

            console.log('error  ');
            if (jqXHR.status === 0) {
                //document.getElementById('LoadingImage').style.display = 'none';
                $.mobile.changePage('Error_Red.html');
            } else if (exception === 'timeout') {
                //document.getElementById('LoadingImage').style.display = 'none';
                alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html');
                return;
            }
        },
        async: true
    }
            );
    }
    

    function cargaCombosCEDEs() {
        // var cliente = localStorage.getItem("CLIENTE");
        //console.log('cboProductosCEDEs-->' + $('#cboProductosCEDEs').val());
        var GET_TOKEN = urlws + 'GET_COMBOS_CEDEs/idProducto/' + $('#cboProductosCEDEs').val();

        $.ajax(
        {
        type: "GET",
            url: GET_TOKEN,
                data: "{}",
                timeout: 90000,
                cache: false,
                contentType: "json",
                success: function (objRegreso) {
            if (objRegreso == undefined) {
                //document.getElementById('LoadingImage').style.display = 'none';
                objRegreso = "-1";
                alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                        }
                else {
                console.log(objRegreso[0]);
                console.log('---------------');
                console.log(objRegreso[1]);
                console.log('---------------');
                console.log(objRegreso[2]);
                console.log('---------------');
                console.log(objRegreso[3]);

                $("#divCboPlazosCEDE").html(objRegreso[0]);
                $("#divCboPeriodicidadCEDE").html(objRegreso[1]);
                $("#divInstruccionesCEDE").html(objRegreso[2]);
                $("#divCboMonedasCEDE").html(objRegreso[3]);

                    //        $('select').selectmenu({
                    //mini: true
                    //        });
                    //style al cbo Destino de terceros
                    //document.getElementById('cmbCuentasTercerosD-button').setAttribute('style', ' padding: 3px;font-size: 12px;');
                }

                },
                    error: function (jqXHR, exception) {

                        console.log('error  ');
                        if(jqXHR.status === 0) {
                            //document.getElementById('LoadingImage').style.display = 'none';
                            $.mobile.changePage('Error_Red.html');
                        } else if (exception === 'timeout') {
                                //document.getElementById('LoadingImage').style.display = 'none';
                                alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                        }
                        },
                                    async: true
                        }
    );

    }

    function loadCboProductosCEDE() {
        //
        
        var cliente = localStorage.getItem("CLIENTE");
        var GET_TOKEN = urlws + 'GET_PRODUCTOS_CEDE/nocliente/' + cliente;
        //alert(GET_TOKEN);
        $.ajax(
                {
                    type: "GET",
                    url: GET_TOKEN,
                    data: "{}",
                    timeout: 90000,
                    cache: false,
                    contentType: "json",
                    success: function (objRegreso) {
                        if (objRegreso == undefined) {
                            //document.getElementById('LoadingImage').style.display = 'none';
                            objRegreso = "-1";
                            alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                        }
                        else {


                            $("#divCboProductosCEDE").html(objRegreso);
                            //$('select').selectmenu({
                            //    mini: true
                            //});
                            //style al cbo Destino de terceros
                            //document.getElementById('cmbCuentasTercerosD-button').setAttribute('style', ' padding: 3px;font-size: 12px;');

                            // document.getElementById('DivCuentasDestinoTerceros').setAttribute('style', ' padding: 3px;font-size: 12px;');
                            //$("#" + idDivName).html(objRegreso);
                            //if (document.getElementById('cmbCuentasPropiasO')) {
                            //    document.getElementById('cmbCuentasPropiasO').setAttribute('style', 'width: 100%; opacity: 1; ');

                            //}

                        }

                    },
                    error: function (jqXHR, exception) {

                        console.log('error  ');
                        if (jqXHR.status === 0) {
                            //document.getElementById('LoadingImage').style.display = 'none';
                            $.mobile.changePage('Error_Red.html');
                        } else if (exception === 'timeout') {
                            //document.getElementById('LoadingImage').style.display = 'none';
                            alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                        }
                    },
                    async: true
                }
                );


    }

    function loadCboTercerosD() {

    var cliente = localStorage.getItem("CLIENTE");
    var GET_TOKEN = urlws + 'GET_CTAS_CBO_3o/nocliente/' +cliente;

    $.ajax(
            {
                    type: "GET",
                    url: GET_TOKEN,
                    data: "{}",
                    timeout: 90000,
                    cache: false,
                    contentType: "json",
                    success: function (objRegreso) {
                    if (objRegreso == undefined) {
                        //document.getElementById('LoadingImage').style.display = 'none';
                        objRegreso = "-1";
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                    }
                    else {


                        $("#DivCuentasDestinoTerceros").html(objRegreso);
                        $('select').selectmenu({ mini: true
                    });
                        //style al cbo Destino de terceros
                        //document.getElementById('cmbCuentasTercerosD-button').setAttribute('style', ' padding: 3px;font-size: 12px;');

                        // document.getElementById('DivCuentasDestinoTerceros').setAttribute('style', ' padding: 3px;font-size: 12px;');
                        //$("#" + idDivName).html(objRegreso);
                        //if (document.getElementById('cmbCuentasPropiasO')) {
                        //    document.getElementById('cmbCuentasPropiasO').setAttribute('style', 'width: 100%; opacity: 1; ');

                        //}

                    }

            },
                    error: function (jqXHR, exception) {

                    console.log('error  ');
                    if (jqXHR.status === 0) {
                        //document.getElementById('LoadingImage').style.display = 'none';
                        $.mobile.changePage('Error_Red.html');
                    } else if (exception === 'timeout') {
                        //document.getElementById('LoadingImage').style.display = 'none';
                        alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                    }
            },
                    async: true
    }
            );


    }

    function loadCboOtrosD() {

        var cliente = localStorage.getItem("CLIENTE");
        var GET_TOKEN = urlws + 'GET_CTAS_CBO_OTROS/nocliente/' + cliente;

        $.ajax(
                {
                    type: "GET",
                    url: GET_TOKEN,
                    data: "{}",
                    timeout: 90000,
                    cache: false,
                    contentType: "json",
                    success: function (objRegreso) {
                        if (objRegreso == undefined) {
                            objRegreso = "-1";
                            alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                        }
                        else {


                            $("#DivCuentasDestinoOtros").html(objRegreso);
                            $('select').selectmenu({
                                mini: true
                            });
                            

                        }

                    },
                    error: function (jqXHR, exception) {

                        console.log('error  ');
                        if (jqXHR.status === 0) {
                            //document.getElementById('LoadingImage').style.display = 'none';
                            $.mobile.changePage('Error_Red.html');
                        } else if (exception === 'timeout') {
                            //document.getElementById('LoadingImage').style.display = 'none';
                            alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                        }
                    },
                    async: true
                }
                );


    }

    function cleanTransferenciasTerceros() {

    if (document.getElementById("formaTablaSegundaTerceros")) {
        document.getElementById("formaTablaSegundaTerceros").setAttribute('style', 'display:none;');
        document.getElementById("formaTablaUnoTerceros").setAttribute('style', 'table-layout: fixed;width: 100%;');
    }

    document.getElementById("txtDescriCortaTerceros").value = '';
    document.getElementById("txtReferenciaTerceros").value = '';
    if (document.getElementById("cmbCuentasTercerosO")) {
        document.getElementById("cmbCuentasTercerosO").selectedIndex = '0';
    }

    document.getElementById("cmbCuentasTercerosD").innerHTML = '';
    document.getElementById("txtImporteTerceros").value = '';
        //document.getElementById("cmbCuentasTercerosD").setAttribute('style', 'padding: 0px;');


    }

    function cleanTransferenciasOtros() {

        if (document.getElementById("formaTablaSegundaOtros")) {
            document.getElementById("formaTablaSegundaOtros").setAttribute('style', 'display:none;');
            document.getElementById("formaTablaUnoOtros").setAttribute('style', 'table-layout: fixed;width: 100%;');
        }

        document.getElementById("txtDescriCortaOtros").value = '';
        document.getElementById("txtReferenciaOtros").value = '';
        if (document.getElementById("cmbCuentasOtrosO")) {
            document.getElementById("cmbCuentasOtrosO").selectedIndex = '0';
        }

        document.getElementById("cmbCuentasOtrosD").innerHTML = '';
        document.getElementById("txtImporteOtros").value = '';
    }

    function iniciaDetalleCredito() {
        $("#divCboCuentasDetalleCredito").html('');
        $("#divTablaDetalleCredito").html('');

        //carga cbo productos
        loadCboDetalleCredito();
       
    }

    function iniciaMovimientosCredito() {
        //carga cbo productos
        $("#divGrdCreditoMovimientos").html('');
        loadCboMovimientosCredito();
    }

    function loadCboMovimientosCredito() {
        var cliente = localStorage.getItem("CLIENTE");
        var GET_TOKEN = urlws + 'GET_CUENTAS_MOV_CREDITO/nocliente/' + cliente;
        //alert(GET_TOKEN);
        $.ajax(
                {
                    type: "GET",
                    url: GET_TOKEN,
                    data: "{}",
                    timeout: 90000,
                    cache: false,
                    contentType: "json",
                    success: function (objRegreso) {
                        if (objRegreso == undefined) {
                            //document.getElementById('LoadingImage').style.display = 'none';
                            objRegreso = "-1";
                            alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                        }
                        else {


                            $("#DivCuentasMovimientosCreditosSelect").html(objRegreso);


                        }

                    },
                    error: function (jqXHR, exception) {

                        console.log('error  ');
                        if (jqXHR.status === 0) {
                            //document.getElementById('LoadingImage').style.display = 'none';
                            $.mobile.changePage('Error_Red.html');
                        } else if (exception === 'timeout') {
                            //document.getElementById('LoadingImage').style.display = 'none';
                            alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                        }
                    },
                    async: true
                }
                );

    }

    function loadMovCredito(evt) {
        var idSaldo = evt.value;

        var GET_MOVIMIENTOS = urlws + 'GET_MOVIMIENTOS_CREDITOS/idSaldo/' + idSaldo;
        console.log(GET_MOVIMIENTOS);
        $.ajax(
                {
                    type: "GET",
                    url: GET_MOVIMIENTOS,
                    data: "{}",
                    timeout: 90000,
                    cache: false,
                    contentType: "json",
                    success: function (objRegreso) {
                        if (objRegreso == undefined) {
                            document.getElementById('LoadingImage').style.display = 'none';
                            objRegreso = "-1";
                        }


                        $("#divGrdCreditoMovimientos").html(objRegreso);
                        return;
                    },
                    error: function (jqXHR, exception) {
                        if (jqXHR.status === 0) {
                            document.getElementById('LoadingImage').style.display = 'none';
                            $.mobile.changePage('Error_Red.html');
                        } else if (exception === 'timeout') {
                            document.getElementById('LoadingImage').style.display = 'none';
                            alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                        }
                    },
                    async: true
                }
            );
    }

    function loadCboDetalleCredito() {
        var cliente = localStorage.getItem("CLIENTE");
        var GET_TOKEN = urlws + 'GET_CUENTAS_CREDITO/nocliente/' + cliente;
        //alert(GET_TOKEN);
        $.ajax(
                {
                    type: "GET",
                    url: GET_TOKEN,
                    data: "{}",
                    timeout: 90000,
                    cache: false,
                    contentType: "json",
                    success: function (objRegreso) {
                        if (objRegreso == undefined) {
                            //document.getElementById('LoadingImage').style.display = 'none';
                            objRegreso = "-1";
                            alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                        }
                        else {


                            $("#divCboCuentasDetalleCredito").html(objRegreso);
                            

                        }

                    },
                    error: function (jqXHR, exception) {

                        console.log('error  ');
                        if (jqXHR.status === 0) {
                            //document.getElementById('LoadingImage').style.display = 'none';
                            $.mobile.changePage('Error_Red.html');
                        } else if (exception === 'timeout') {
                            //document.getElementById('LoadingImage').style.display = 'none';
                            alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                        }
                    },
                    async: true
                }
                );

    }

    function loadCredito(evt) {
        var ID_SALDO = evt.value;

        getDetalleCredito(ID_SALDO);

    }

    function getCuentaPagoCredito(evt) {

        var txtcombo = evt.options[evt.selectedIndex].innerHTML;
        
        

        if(evt.selectedIndex > 0)
        {
            
            var vritem = txtcombo.split('-');
            //console.log('spliting' + vritem[0]);

            $("#DivLBLCuentaPagoCredito").html(vritem[0]);
            //$('#DivLBLCuentaPagoCredito').val(vritem[0]);
        }

        //getDetalleCredito(ID_SALDO);

    }
   
    function getDetalleCredito(ID_SALDO) {
        var GET_MOVIMIENTOS = urlws + 'HB_Detalle_Credito/idSaldo/' + ID_SALDO;


        console.log("input" + GET_MOVIMIENTOS);
        //alert(GET_MOVIMIENTOS);
        $.ajax(
    {
        type: "GET",
        url: GET_MOVIMIENTOS,
        data: "{}",
        timeout: 90000,
        cache: false,
        contentType: "json",
        success: function (objRegreso) {
            if (objRegreso == undefined) {
                //document.getElementById('LoadingImage').style.display = 'none';
                objRegreso = "-1";
            }


            console.log("output -->  " + objRegreso);



                $("#divTablaDetalleCredito").html(objRegreso);
                return false;
           
        },
        error: function (jqXHR, exception) {
            if (jqXHR.status === 0) {
                document.getElementById('LoadingImage').style.display = 'none';
                $.mobile.changePage('Error_Red.html');
            } else if (exception === 'timeout') {
                document.getElementById('LoadingImage').style.display = 'none';
                alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
            }
        },
        async: true
    }
               );
    }

    function iniciaPagoCreditos() {
        $("#cboCuentasPagoCreditos").html('');
       //$("#divTablaDetalleCredito").html('');

        //carga cbo productos
        loadCboPagoCreditos();
        loadCboGenerales('DivcboCuentasPagoCreditos', 'cmbCuentasPagoCreditos', 'Dummy');
    }
    function loadCboPagoCreditos() {
        var cliente = localStorage.getItem("CLIENTE");
        var GET_TOKEN = urlws + 'GET_CUENTAS_CREDITO/nocliente/' + cliente;
        //alert(GET_TOKEN);
        $.ajax(
                {
                    type: "GET",
                    url: GET_TOKEN,
                    data: "{}",
                    timeout: 90000,
                    cache: false,
                    contentType: "json",
                    success: function (objRegreso) {
                        if (objRegreso == undefined) {
                            //document.getElementById('LoadingImage').style.display = 'none';
                            objRegreso = "-1";
                            alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                        }
                        else {

                            objRegreso = objRegreso.replace('loadCredito(this)', 'getCuentaPagoCredito(this)')
                            $("#cboCuentasPagoCreditos").html(objRegreso);


                        }

                    },
                    error: function (jqXHR, exception) {

                        console.log('error  ');
                        if (jqXHR.status === 0) {
                            //document.getElementById('LoadingImage').style.display = 'none';
                            $.mobile.changePage('Error_Red.html');
                        } else if (exception === 'timeout') {
                            //document.getElementById('LoadingImage').style.display = 'none';
                            alert('A ocurrido un error inesperado; intente de nuevo, o m\u00e1s tarde'); $.mobile.changePage('BancaMovil.html'); return;
                        }
                    },
                    async: true
                }
                );
    }