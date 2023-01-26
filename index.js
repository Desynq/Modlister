const fs = require('fs');

const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./client_secret.json');
const doc = new GoogleSpreadsheet('1vpyKtbT2-kC8G9x7YyPTS6BMFBbx9b_QORgea94GaZI');

const files = fs.readdirSync('C:/Users/notde/curseforge/minecraft/Instances/Slime Survival 1.19.2/mods');

fs.writeFileSync('./output.txt', '');









function presetModlistCell(file_name, sheet, rowIndex) {
	const jar_name = file_name.replace('.jar', '');

	let jar_name_cell = sheet.getCell(rowIndex, 1);

	jar_name_cell.value = jar_name;
}



async function accessSpreadsheet() {
	await doc.useServiceAccountAuth({
		client_email: creds.client_email,
		private_key: creds.private_key
	});

	await doc.loadInfo();
	const sheet = doc.sheetsByIndex[0];
	await sheet.loadCells();

	for (let i = 0; i < files.length; i++) {
		presetModlistCell(files[i], sheet, i + 1);
	}

	await sheet.saveUpdatedCells();
}

accessSpreadsheet();