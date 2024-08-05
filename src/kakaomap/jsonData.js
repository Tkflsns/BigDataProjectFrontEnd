
export default async function jsonData(data) {
    try {
        const response = await fetch('http://localhost:8080/record', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'jwt-token'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        console.log("result : ", resultJson)
    } catch (error) {
        console.error('data send fail', error);
    }
}


