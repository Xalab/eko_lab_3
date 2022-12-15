
// визначення середньої 
// добової дози (ADD/LADD),  формула розрахунку якої за інгаляційного 
// впливу речовини з атмосферного повітря
function serednyaDobovaDoza(Ca, Ch, Tout, Tin, Vout, Vin, EF, ED, BW, AT) {
    
    let LADD = (((Ca * Math.pow(10, -6) * Tout * Vout) + (Ch * Tin * Vin)) * EF * ED) / (BW * AT * 365);

    return LADD;
}

// порівняння    фактичних   рівнів   експозиції 
// з безпечними  (референтними)   рівнями   впливу   та   визначенням 
// коефіцієнта небезпеки:
function koeficientNebezpekyObsh(AD=-1, AC=-1, RfD=-1, RfC=-1) {
    
    let HQ;
    if (AD == -1 && RfD == -1) {
        HQ = AC / RfC;
    }
    if (AC == -1 && RfC == -1) {
        HQ = AD / RfD;
    }
    else {
        return false;
    }
    return HQ;
}

// За    інгаляційного    надходження,    якщо    цього 
// не потребують спеціальні задачі  дослідження,  немає  необхідності 
// розраховувати  дозу  впливу
function koeficientNebezpekyRechovyny (C, RfC) {
    return C/RfC;
}

//  Критерії неканцерогенного ризику 
function isDangerous(CR) {
    if (CR >= 10 && CR < 1000) {
        return "Низький";
    }
    else if (CR < 10) {
        return "Мінімальний";
    }
    else if (CR >= 1000 && CR < 10000) {
        return "Середній";
    }
    else if (CR > 10000){
        return "Високий";
    }
}

// Характеристику   ризику   розвитку   неканцерогенних 
// ефектів  за  комбінованого  впливу  хімічних  речовин проводять на 
// основі розрахунку індексу небезпеки
function indexNebezpeky(E, HQ) {
    return E * HQ;
}

// Розрахунок  індивідуального канцерогенного ризику CR
function individualKancerogenRyzyk(LADD, SF) {
    return LADD * SF;
}

// При застосуванні   величини  одиничного  ризику
function individualKancerogenOdynochRyzyk(LADC, UR) {
    return LADC * UR;
}

// Одиничний ризик розраховують із  використанням  величини  SF, 
// стандартної   величини  маси  тіла  людини  (70  кг)  та  добового 
// споживання повітря (20 куб.м)
function UR(SF) {
    return (Math.pow(SF, -1) * 1) / 70 * 20;
}

// Поряд  з розрахунками індивідуального канцерогенного 
// ризику  проводять  визначення  популяційного  ризику  (PCR),  який 
// відображає додаткову (до фонової) кількість випадків новоутворень, 
// які   можуть   виникнути   протягом   життя    внаслідок    впливу 
// досліджуваного фактора
function populationRyzyk(CR, POP) {
    return CR * POP;
}

// При порівняльній характеристиці ризику  іноді  використовують 
// величину  популяційного  річного  ризику  (PCRa),  що  являє собою 
// розраховану кількість додаткових випадків раку протягом року
function velychynaPopulatRichIndex(E, C, UR, POP) {
    return E * (C * UR) * POP / 70
}

// за   впливу  декількох  канцерогенів  сумарний 
// канцерогенний ризик
function sumarnyyKancerogennyRyzyk(E, CRj) {
    return E * CRj;
}

// Класифікація рівнів ризику
let ClasyfycatsiyaRivnyvRyzyku = {
    riven_rizyku: [
        "Високий",
        "Середній",
        "Низький",
        "Мінімальний"
    ],
    ryzykProtyagomZhyttya: {
        first: Math.pow(10, -3),
        second: [Math.pow(10, -3), Math.pow(10, -4)],
        third: [Math.pow(10, -4), Math.pow(10, -6)],
        fourth: Math.pow(10, -6)
    }
}

// РЕКОМЕНДОВАНІ ЗНАЧЕННЯ 
// факторів експозиції
let faktorEkspozytsyy = {
    massaTila: {
        name: [
            "середній дорослий",
            "дорослий чоловік",
            "доросла жінка",
            "середня величина",
            "рекомендована ВООЗ"
        ],
        velychyna: [
            60,
            70,
            58,
            64,
            60
        ]
    },
    ploshchaPoverhnyTila: {
        name: [
            "дорослий чоловік",
            "доросла жінка"
        ],
        velychyna: [
            18000,
            16000
        ]
    },
    obyemDyhannya: {
        norma: {
            name: [
                "дорослий чоловік",
                "доросла жінка",
                "дитина (10 років)"
            ],
            velychyna: [
                3600,
                2900,
                2300
            ]
        },
        lehkaDiyalnist: {
            name: [
                "дорослий чоловік",
                "доросла жінка",
                "дитина (10 років)"
            ],
            velychyna: [
                9600,
                9100,
                6240
            ]
        }
    },
    ingalyaciyaZaDobu: {
        name: [
            "дорослий чоловік",
            "доросла жінка",
            "дитина (10 років)",
            "середній дорослий"
        ],
        velychyna: [
            23,
            21,
            15,
            22
        ]
    },
    shvidkistIngalyacii: {
        name: [
            "діти (вік 1 рік і менше)",
            "діти (вік 1-12 років)",
            "дорослі жінки",
            "дорослі чоловіки"
        ],
        velychyna: [
            4.5,
            8.7,
            11.3,
            15.2
        ]
    },
    chasUPrimishchenny: {
        name: [
            "діти 3-11 років",
            "дорослі"
        ],
        velychyna: {
            budny: [
                19,
                21
            ],
            vyhydny: [
                17,
                16.4
            ]
        }
    },
    ChasPozaPrimishchennyam: {
        name: [
            "діти 3-11 років",
            "дорослі"
        ],
        velychyna: {
            budny: [
                5,
                7
            ],
            vyhydny: [
                1.5,
                2
            ]
        }
    }
}

// РЕФЕРЕНТНІ КОНЦЕНТРАЦІЇ 
// за хронічного інгаляційного впливу 
let refConcentZaHronIngVpliv = {
    rechovyna: [
        "Азотна кислота",
        "Аміак",
        "Бензол",
        "Етанол",
        "Керосин",
        "Ртуть та сполуки",
        "Сірки діоксид",
        "Фосфор",
        "Хлор",
        "Хлорметан",
        "Хлороформ",
        "Хлоретан",
        "Ціаніди",
        "Циклогексан",
        "Цинк та сполуки"
    ],
    RfC: [
        0.04,
        0.1,
        0.06,
        100,
        0.01,
        0.003,
        0.08,
        0.00007,
        0.0002,
        0.1,
        0.098,
        10,
        0.003,
        0.28,
        0.0009
    ],
    critical: [
        "Органи дихання",
        "Органи дихання",
        "Розвиток, кров, ЦНС",
        "Органи дихання, ЦНС",
        "Печінка",
        "ЦНС",
        "Органи дихання",
        "Реп род., системн., волосся",
        "Органи дихання",
        "ЦНС",
        "Печінка, розвиток, нирки",
        "Розвиток, ШКТ",
        "Нервова сист., гормон.",
        "ЦНС, органи дихання",
        "Органи дихання"
    ]
}

// ФАКТОРИ 
// канцерогенного потенціалу
let factoryKancerPotential = {
    rechovyna: [
        "Азасерин",
        "Анілін",
        "ДДТ",
        "Кадмій",
        "Мелфалан",
        "Миш'як",
        "Нітрогліцерин",
        "Нітроген",
        "Свинець",
        "Токсафен",
        "Феназопірідин",
        "Фуріум",
        "Хлор метан",
        "Хромова кислота",
        "Етиленімін"
    ],
    SFi: [
        11,
        0.0057,
        0.34,
        6.3,
        130,
        15,
        0.014,
        0.082,
        0.042,
        1.1,
        0.17,
        1.5,
        0.0063,
        42,
        65
    ]
}

document.getElementById('out').checked = true;
document.getElementById("chastota").value = "365";
document.getElementById("trivalist").value = "30";
document.getElementById("vaga").value = "70";

document.getElementById("form").addEventListener('submit', evt => {
    evt.preventDefault();  
});

function isInOrOut() {
    let inside = document.getElementById("in").checked;
    let out = document.getElementById("out").checked;
    if (inside) {
        return true;
    }
    else {
        return false;
    }
}

document.getElementById("rozrah").addEventListener('click', () => {
    let e = document.getElementById("selectRech");
    let rechovyna = e.options[e.selectedIndex].text;
    let inOrOut = isInOrOut();
    let chastota = document.getElementById("chastota").value;
    let tryvalist = document.getElementById("trivalist").value;
    let vaga = document.getElementById("vaga").value;
    let kilkist = document.getElementById("kilkist").value;

    // let Ca = refConcentZaHronIngVpliv.RfC[refConcentZaHronIngVpliv.rechovyna.findIndex((elem) => {return elem == rechovyna})];
    Ca = kilkist;
    console.log("Ca = " + Ca);

    let Ch = 1 * Ca;
    console.log("Ch = " + Ch);

    let Tin = faktorEkspozytsyy.chasUPrimishchenny.velychyna.budny[0];
    console.log("Tin = " + Tin);

    let Tout = faktorEkspozytsyy.ChasPozaPrimishchennyam.velychyna.budny[0];
    console.log("Tout = " + Tout);

    let Vin = 0.63;
    let Vout = 1.4;

    EF = chastota;
    ED = tryvalist;
    BW = vaga;
    AT = 70;

    let LADD = serednyaDobovaDoza(Ca, Ch, Tout, Tin, Vout, Vin, EF, ED, BW, AT);
    
    console.log("LADD = " + LADD + " помножена на 10 у -6 степені мг/кг-доба");

    let SF = Ca * Math.random(1) * 3;


    console.log(Math.random(1) * 3);
    // Величина індивідуального канцерогенного ризику
    let CR = individualKancerogenRyzyk(LADD, SF);

    console.log("CR = " + CR + " помножена на 10 у -6 степені");
    
    console.log(isDangerous(CR))
    

    let ladd = document.getElementById("LADD").innerText = "LADD = " + LADD + " помножена на 10 у -6 степені мг/кг-доба";
    let cr = document.getElementById("CR").innerText = "CR = " + CR + " помножена на 10 у -6 степені"
    let rivenRyz = document.getElementById("rivenRyz").innerHTML = "Рівень небезпеки: " + isDangerous(CR);


});