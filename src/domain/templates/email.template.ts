import envs from "../../config/envs";

export function generateOrderEmailTemplate(
    userId: string,
    products: Array<{
        name: string; productId: string; quantity: number 
}>,
    total: number,
    lat: number,
    lng: number,
    creationDate: Date
): string {
    const mapImageUrl = generateMapboxStaticImageURL(lat, lng);

    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Detalles de la Orden</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
                background-color: #007BFF;
                color: #ffffff;
                padding: 20px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .content {
                padding: 20px;
            }
            .content p {
                margin: 10px 0;
            }
            .footer {
                background-color: #f4f4f4;
                color: #777;
                padding: 10px;
                text-align: center;
                font-size: 12px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Detalles de la Orden</h1>
            </div>
            <div class="content">
                <p><strong>Usuario ID:</strong> ${userId}</p>
                <p><strong>Productos:</strong></p>
                <ul>
                    ${products.map(p => `<li>Producto: ${p.name}, Cantidad: ${p.quantity}</li>`).join('')}
                </ul>
                <p><strong>Total:</strong> $${total}</p>
                <p><strong>Fecha de creación:</strong> ${creationDate}</p>
                <p><strong>Ubicación del pedido::</strong> Lat: ${lat}, Lng: ${lng}</p>
            </div>
            <div class="footer">
                <p>Este es un correo generado automáticamente. Por favor, no responda a este mensaje.</p>
                <img src="${mapImageUrl}" alt="Ubicación de entrega" />
            </div>
        </div>
    </body>
    </html>
    `;
}


export const generateMapboxStaticImageURL = (lat: number, lng: number): string => {
    const accessToken = envs.MAPBOX_ACCESS_TOKEN;
    const zoom = 15;
    const width = 800;
    const height = 500;
    return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l-marker+ff0000(${lng},${lat})/${lng},${lat},${zoom}/${width}x${height}?access_token=${accessToken}`;
};
