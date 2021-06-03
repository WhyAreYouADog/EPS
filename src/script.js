const { Scanner } = require('nnmap.js');

const scanner = new Scanner({
    profile: 'Quick scan',
});

scanner.on('scanComplete', (nmapOut) => {
    var data = nmapOut.scanData.data.hosts[0].ports.portArray
    console.log(data);
    listPorts(data)
});

function listPorts(array){
    var div = document.getElementById("portList")
    array.forEach(element => {
        var subDiv = document.createElement("div")
        subDiv.setAttribute("class","subDiv")

        var port = document.createElement("p")
        var status = document.createElement("p")
        port.innerHTML = element.portid
        status.innerHTML = element.state
        port.setAttribute("class","port")
        status.setAttribute("class","port")

        subDiv.appendChild(port)
        subDiv.appendChild(status)
        div.appendChild(subDiv)
    })
}

function getIP(){
    return new Promise(resolve =>{
        var ip = document.getElementById("textInput").value
        resolve(ip)
    })
}

async function startScann(){
    var ip = String(await getIP())
    var div = document.getElementById("portList")

    console.log(ip);
    
    scanner.startScan(ip)

}  