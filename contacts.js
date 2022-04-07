const chalk = require('chalk');
const fs = require('fs');
const validator = require('validator');

// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// membuat folder data
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
};

// membuat file contacts.json jika belum ada
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
};

// const tulisPertanyaan = (pertanyaan) => {
//     return new Promise((resolve, reject) => {
//         rl.question(pertanyaan, (isi) => {
//             resolve(isi);
//         });
//     });
// };

const simpanContact = (nama, email, noHP) => {
    const contact = { nama, email, noHP };
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);

    // cek duplikat
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if (duplikat) {
        console.log(chalk.red.inverse.bold('Contact sudah terdaftar, gunakan nama lain!'));
        return false;
    }

    // cek email
    if(email){
        if (!validator.isEmail(email)) {
            console.log(chalk.red.inverse.bold('Email tidak valid!'));
            return false;
        }
    }

    // cek nohp
    if (!validator.isMobilePhone(noHP, 'id-ID')) {
        console.log(chalk.red.inverse.bold('Nomor HP tidak valid!'));
        return false;
    }

    contacts.push(contact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

    console.log(chalk.green.inverse.bold('Terimakasih sudah memasukkan data.'));

};

module.exports = { simpanContact };