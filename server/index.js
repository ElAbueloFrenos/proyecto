import express from "express";
import cors from "cors";

// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Agrega credenciales
const access_Token = 'APP_USR-3779755450381670-041515-e2fd9492b11c987468cd3454dc03d5a3-488773547';
const client = new MercadoPagoConfig({ accessToken: access_Token });

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Soy el server :)");
});

app.post("/create_preference", async (req, res) => {
    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price),
                    currency_id: "ARS",
                },
            ],
            back_urls: {
                success: "https://www.youtube.com/watch?v=atxYe-nOa9w",
                failure: "https://www.youtube.com/watch?v=QCfZ0awk1Vk",
                pending: "https://www.youtube.com/watch?v=89dGC8de0CA",
            },
            auto_return: "approved",
        };

        const preference = new Preference(client);
        const result = await preference.create({ body });
        res.json({
            id: result.id,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error al crear la preferencia :("
        });
    }
});

app.listen(port, () => {
    console.log('El servidor esta corriendo en el puerto ' + port);
});