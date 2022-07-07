
function formatVal(number, format) {
    if (format == 'float') {
        number = '' + parseFloat(number);
        if (number.length > 3) {
            let mod = number.length % 3;
            let output = (mod > 0 ? (number.substring(0,mod)) : '');
            for (i=0 ; i < Math.floor(number.length / 3); i++) {
                if ((mod == 0) && (i == 0))
                    output += number.substring(mod + 3 * i, mod + 3 * i + 3);
                else
                    output += '.' + number.substring(mod + 3 * i, mod + 3 * i + 3);
            }
            return (output);
        }
        else 
            return number;
    }
    else 
        return number;
}

function showVal(value, valueUnit, format) {
    document.getElementById("curVal").innerText = formatVal(value, format) + ' ' + valueUnit;
}

JFCustomWidget.subscribe("ready", function () {
    let jotformSettings = JFCustomWidget.getWidgetSettings();
    let valueUnit;
    let label = JFCustomWidget.getWidgetSetting('QuestionLabel');
    if (jotformSettings.unit == null || jotformSettings.unit == undefined) {
        valueUnit = ' ';
    }
    else {
        valueUnit = jotformSettings.unit;
    }
    document.getElementById("curVal").innerText = formatVal(jotformSettings.defaultValue.trim(), jotformSettings.format) + ' ' + valueUnit;
    // console.log(label);
    document.getElementById('dat-slider').addEventListener('change', () => { showVal(document.getElementById('dat-slider').value, valueUnit, jotformSettings.format) });
    document.getElementById('dat-slider').addEventListener('input', () => { showVal(document.getElementById('dat-slider').value, valueUnit, jotformSettings.format) });

    label != '' ? document.getElementById('label').innerText = label : document.getElementById('label').innerText = '';
    jotformSettings.minValue != '' ? document.getElementById('dat-slider').min = parseFloat(jotformSettings.minValue.trim()) : document.getElementById('dat-slider').min = 0;
    
    jotformSettings.maxValue != '' ? document.getElementById('dat-slider').max = parseFloat(jotformSettings.maxValue.trim()) : document.getElementById('dat-slider').max = 100;
    jotformSettings.stepLength != '' ? document.getElementById('dat-slider').step = parseFloat(jotformSettings.stepLength.trim()) : document.getElementById('dat-slider').step = 10;
    jotformSettings.defaultValue != '' ? document.getElementById('dat-slider').value = parseFloat(jotformSettings.defaultValue.trim()) : document.getElementById('dat-slider').value = 50;
    if (jotformSettings.color != '') {
        document.getElementById('dat-slider').style.backgroundColor = jotformSettings.color;
    }

    if (jotformSettings.colorThumb != '') {
        let style = document.querySelector('[data="range"]');
        style.innerText = ".range::-webkit-slider-thumb { background: " + jotformSettings.colorThumb + " !important; }";
    }

    document.getElementById('minValue').innerText = formatVal(jotformSettings.minValue.trim(), jotformSettings.format) + ' ' + valueUnit;
    if (jotformSettings.format == 'current year') {
        document.getElementById('maxValue').innerText = new Date().getFullYear(); 
    }
    else {
        document.getElementById('maxValue').innerText = formatVal(jotformSettings.maxValue.trim(), jotformSettings.format) + ' ' + valueUnit;
    }
    JFCustomWidget.subscribe("submit", function () {

        let msg = {
            valid: true,
            value: document.getElementById('dat-slider').value
        }
        console.log(msg);
        JFCustomWidget.sendSubmit(msg);
    });
});