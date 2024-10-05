// Haetaan DOM-elementit
const saldoInput = document.getElementById("saldo");
const paivitaSaldoBtn = document.getElementById("paivitaSaldo");
const nykyinenSaldoDisplay = document.getElementById("nykyinenSaldo");

// Alustetaan saldo
let saldo = 0;

// Lisää tapahtumakuuntelija saldon päivittämiseen
paivitaSaldoBtn.addEventListener("click", () => {
    const uusiSaldo = parseFloat(saldoInput.value);
    if (!isNaN(uusiSaldo)) {
        saldo = uusiSaldo;
        nykyinenSaldoDisplay.textContent = saldo;
        saldoInput.value = ""; // Tyhjennä syöttökenttä
    } else {
        alert("Syötä kelvollinen saldo!");
    }
});

// Lainan hakeminen
const lainaSummaInput = document.getElementById("lainaSumma");
const haeLainaBtn = document.getElementById("haeLaina");
const lainaViesti = document.getElementById("lainaViesti");

haeLainaBtn.addEventListener("click", () => {
    const lainaSumma = parseFloat(lainaSummaInput.value);
    if (!isNaN(lainaSumma) && lainaSumma > 0) {
        // Lähetetään sähköposti EmailJS:n kautta
        emailjs.send(service_uywi62o, template_yi7rjwr, {
            laina_saldo: lainaSumma,
            user_email: "ronjaturu@gmail.com"
        })
        .then((response) => {
            lainaViesti.textContent = `Lainahakemus summalle ${lainaSumma} Ronja Massia on lähetetty sähköpostiosoitteeseen: ronjaturu@gmail.com.`;
            lainaSummaInput.value = ""; // Tyhjennä syöttökenttä
        }, (error) => {
            alert("Lainahakemusta ei voitu lähettää. Yritä uudelleen.");
        });
    } else {
        alert("Syötä kelvollinen laina-summa!");
    }
});

// Kortin generointi
const kortinNumeroDisplay = document.getElementById("kortinNumero");
const generoiKorttiBtn = document.getElementById("generoiKortti");

generoiKorttiBtn.addEventListener("click", () => {
    const kortinNumero = generateRandomCardNumber();
    kortinNumeroDisplay.textContent = kortinNumero;
});

// Funktio satunnaisen kortin numeron generoimiseen
function generateRandomCardNumber() {
    const prefix = '4'; // Visa-korttien prefix
    const randomNumber = Math.floor(Math.random() * 10000000000000000); // 16-numeroinen
    return prefix + randomNumber.toString().padStart(15, '0').slice(0, 15); // Padded ja sliced 15 numeroon
}
