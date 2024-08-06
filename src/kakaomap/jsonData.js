
export default async function jsonData({data, setMarkerdata}) {
    try {
        const response = await fetch('http://:8080/record', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'jwt-token'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        console.log("result : ", result)
        setMarkerdata(result);
    } catch (error) {
        console.error('data send fail', error);
    }   
}


