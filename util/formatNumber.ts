function formatNumber(number: number): string {
	if (number === 0) {
		return '0';
	}
	const abbreviations = ['', 'k', 'M', 'B', 'T'];
	const numDigits = Math.floor(Math.log10(number) / 3);

	if (numDigits === 0) {
		return number.toString();
	}

	const abbreviation = abbreviations[numDigits];
	const formattedNumber = (number / Math.pow(10, numDigits * 3)).toFixed(1);

	return formattedNumber + abbreviation;
}

export default formatNumber;
