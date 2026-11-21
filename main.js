document.addEventListener("DOMContentLoaded", function () {
    const xonaTugmalari = document.querySelectorAll(".xona-karta .tugma-oltin");
    const xonaTanlash = document.querySelector("#xona-turi");
    const kelishSana = document.querySelector("#kelish");
    const ketishSana = document.querySelector("#ketish");
    const jamiNarxMatni = document.querySelector("#jami-narx");
    const bandForma = document.querySelector(".forma");

    const xonaNarxlari = {
        "Yakka kishilik": 45,
        "Ikki kishilik Standart": 70,
        "Komfort": 95,
        "Biznes": 120,
        "Deluks": 150,
        "Yarim Lyuks": 180,
        "Lyuks": 220,
        "Oilaviy": 250,
        "Katta Oilaviy": 300,
        "Panoramali Lyuks": 350,
        "Qirollik Suite": 450,
        "Prezident Suite": 600
    };

    const bugun = new Date().toISOString().split("T")[0];
    if (kelishSana) kelishSana.min = bugun;
    if (ketishSana) ketishSana.min = bugun;

    xonaTugmalari.forEach(function (tugma) {
        tugma.addEventListener("click", function () {
            const karta = this.closest(".xona-karta");
            const xonaNomi = karta.querySelector("h3").textContent.trim();

            if (xonaTanlash) {
                for (let i = 0; i < xonaTanlash.options.length; i++) {
                    if (xonaTanlash.options[i].text.includes(xonaNomi)) {
                        xonaTanlash.selectedIndex = i;
                        break;
                    }
                }
                narxniHisobla();
            }
        });
    });

    function narxniHisobla() {
        if (!kelishSana || !ketishSana || !xonaTanlash || !jamiNarxMatni) return;

        const boshlanish = new Date(kelishSana.value);
        const tugash = new Date(ketishSana.value);
        const tanlanganXona = xonaTanlash.value;

        if (kelishSana.value && ketishSana.value && tugash > boshlanish) {
            const farqVaqt = tugash - boshlanish;
            const kunlarSoni = Math.ceil(farqVaqt / (1000 * 60 * 60 * 24));
            const kunlikNarx = xonaNarxlari[tanlanganXona] || 70;
            const umumiySumma = kunlarSoni * kunlikNarx;

            jamiNarxMatni.textContent = `Jami (${kunlarSoni} tun): $${umumiySumma}`;
        } else {
            jamiNarxMatni.textContent = "Jami: $0";
        }
    }

    if (kelishSana) kelishSana.addEventListener("change", narxniHisobla);
    if (ketishSana) ketishSana.addEventListener("change", narxniHisobla);
    if (xonaTanlash) xonaTanlash.addEventListener("change", narxniHisobla);

    if (bandForma) {
        bandForma.addEventListener("submit", function (e) {
            e.preventDefault();

            const ism = bandForma.querySelector('input[type="text"]').value.trim();
            const telefon = bandForma.querySelector('input[type="tel"]').value.trim();

            if (!ism || !telefon) {
                alert("Iltimos, ismingiz va telefon raqamingizni kiriting!");
                return;
            }

            const xabarQuti = document.createElement("div");
            xabarQuti.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #1e293b;
                color: #fff;
                padding: 18px 25px;
                border-left: 5px solid #d4af37;
                border-radius: 8px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.3);
                z-index: 1000;
                font-family: sans-serif;
            `;
            xabarQuti.innerHTML = `
                <strong>Rahmat, ${ism}!</strong><br>
                Xonangiz muvaffaqiyatli band qilindi. Tez orada bog'lanamiz.
            `;

            document.body.appendChild(xabarQuti);
            bandForma.reset();
            if (jamiNarxMatni) jamiNarxMatni.textContent = "Jami: $0";

            setTimeout(function () {
                xabarQuti.remove();
            }, 4000);
        });
    }
});