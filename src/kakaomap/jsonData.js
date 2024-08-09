
export default async function jsonData({data, setMarkerdata}) {

    // const data1 = {
    //     classroom:false,
    //     cultural:false,
    //     ha:1,
    //     oa:3,
    //     pa:3,
    //     parking:true,
    //     qa:1,
    //     sports:false
    // }
    console.log("data : ", data);
    try {
        const response = await fetch('http://10.125.121.183:8080/search/record', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'jwt-token'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok){
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log("result : ", result)
        setMarkerdata(result);
    } catch (error) {
        console.error('data send fail', error);
    }   
}


