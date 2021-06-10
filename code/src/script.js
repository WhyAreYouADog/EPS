const { Scanner } = require('nnmap.js');

const scanner = new Scanner({
    profile: 'Quick scan',
});

scanner.on('scanComplete', (nmapOut) => {
    document.getElementById("loadingDiv").style.display = "none"
    var data = nmapOut.scanData.data.hosts[0].ports.portArray
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
    document.getElementById("loadingDiv").style.display = "block"

    if(div.hasChildNodes()){
        div.remove()
        var newDiv = document.createElement("div")
        newDiv.setAttribute("id","portList")
        document.getElementById("center").appendChild(newDiv)
    }
    
    if(ip == ""){
        scanner.startScan("127.0.0.1")
    }
    else{
        scanner.startScan(ip)
    }

}  