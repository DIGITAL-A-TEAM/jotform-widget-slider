function showVal(value, valueUnit) {
    document.getElementById("curVal").innerHTML = value + ' ' + valueUnit;
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
    document.getElementById("curVal").innerHTML = jotformSettings.defaultValue.trim() + ' ' + valueUnit;
    // console.log(label);
    document.getElementById('dat-slider').addEventListener('change', () => { showVal(document.getElementById('dat-slider').value, valueUnit) });
    document.getElementById('dat-slider').addEventListener('input', () => { showVal(document.getElementById('dat-slider').value, valueUnit) });

    label != '' ? document.getElementById('label').innerHTML = label : document.getElementById('label').innerHTML = '';
    jotformSettings.minValue != '' ? document.getElementById('dat-slider').min = parseFloat(jotformSettings.minValue.trim()) : document.getElementById('dat-slider').min = 0;
    jotformSettings.maxValue != '' ? document.getElementById('dat-slider').max = parseFloat(jotformSettings.maxValue.trim()) : document.getElementById('dat-slider').max = 100;
    jotformSettings.stepLength != '' ? document.getElementById('dat-slider').step = parseFloat(jotformSettings.stepLength.trim()) : document.getElementById('dat-slider').step = 10;
    jotformSettings.defaultValue != '' ? document.getElementById('dat-slider').value = parseFloat(jotformSettings.defaultValue.trim()) : document.getElementById('dat-slider').value = 50;
    if (jotformSettings.color != '') {
        document.getElementById('dat-slider').style.backgroundColor = jotformSettings.color;
    }

    if (jotformSettings.colorThumb != '') {
        let style = document.querySelector('[data="range"]');
        style.innerHTML = ".range::-webkit-slider-thumb { background: " + jotformSettings.colorThumb + " !important; }";
    }

    document.getElementById('minValue').innerHTML = jotformSettings.minValue.trim() + ' ' + valueUnit;
    document.getElementById('maxValue').innerHTML = jotformSettings.maxValue.trim() + ' ' + valueUnit;

    JFCustomWidget.subscribe("submit", function () {

        let msg = {
            valid: true,
            value: document.getElementById('dat-slider').value
        }
        JFCustomWidget.sendSubmit(msg);
    });
});