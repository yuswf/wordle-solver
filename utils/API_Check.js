const API = 'https://sozluk.gov.tr/gts?ara=';

async function check(word) {
    const url = API + word;

    setTimeout(async () => {
        const res = await fetch(url);
        const data = await res.json();

        return !!data.error;
    }, 1000);
}

module.exports = {
    check
}
