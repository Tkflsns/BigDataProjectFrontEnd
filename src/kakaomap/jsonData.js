
export default async function jsonData({data, setMarkerdata}) {

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
        // console.log("result : ", result)
        setMarkerdata(result);
    } catch (error) {
        console.error('data send fail', error);
    }   
}


