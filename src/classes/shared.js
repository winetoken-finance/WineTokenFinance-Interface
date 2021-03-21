

export class Shared {

    getScanLink(data, networkId) {
        if (networkId === 97) {
            return 'https://testnet.bscscan.com/address/' + data;
        } else if (networkId === 56) {
            return 'https://bscscan.com/address/' + data;
        } else {
            return 'https://etherscan.io/address/' + data;
        }
        
    }

    getScanTxLink(data, networkId) {
        if (networkId === 97) {
            return 'https://testnet.bscscan.com/tx/' + data;
        } else if (networkId === 56) {
            return 'https://testnet.bscscan.com/tx/' + data;
        } else {
            return 'https://etherscan.io/tx/' + data;
        }
        
    }

    truncate(str, maxDecimalDigits) {
        if (typeof str !== 'string') {
            str = String(str);
        }
        if (str.includes('.')) {
            const parts = str.split('.');
            return parts[0] + '.' + parts[1].slice(0, maxDecimalDigits);
        }
        return str;
    }

    secondsToDhms(seconds) {
        seconds = Number(seconds);
        var d = Math.floor(seconds / (3600*24));
        var h = Math.floor(seconds % (3600*24) / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 60);
        
        var dDisplay = d > 0 ? d + (d === 1 ? " day, " : " days, ") : "";
        var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
        var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
        var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
        return dDisplay + hDisplay + mDisplay + sDisplay;
    }
}

export default Shared;