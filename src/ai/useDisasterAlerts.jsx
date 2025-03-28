import { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const disasterTypes = [
    'earthquake', 'flood', 'cyclone', 'landslide', 
    'heatwave', 'drought', 'forest fire', 'industrial accident'
];

export function useDisasterAlerts() {
    const [alerts, setAlerts] = useState([]);
    const [lastType, setLastType] = useState('');

    const generateAlert = async () => {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            
            let newType;
            do {
                newType = disasterTypes[Math.floor(Math.random() * disasterTypes.length)];
            } while (newType === lastType);
            
            const prompt = `Generate a realistic ${newType} disaster alert as a JSON object with these properties:
                title (string): Brief description of the ${newType} disaster with specific details
                severity (string): ${Math.random() > 0.5 ? '"high"' : '"medium"'}
                color (string): ${Math.random() > 0.5 ? '"bg-red-500" for severe' : '"bg-orange-500" for moderate'}
                areas (array): exactly 3 different affected areas in India (use real city/district names)
                needs (string): 4-5 specific urgent needs related to ${newType} disaster
                location (object): {region: string, coordinates(object): { lat: number, lng: number }}
                The response should be a valid JSON object without any markdown formatting.`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            let text = response.text();
            
            // Clean up the response
            text = text.replace(/```json\n|\n```|```/g, '').trim();
            const newAlert = JSON.parse(text);
            // console.log('New alert:', newAlert);
            
            setLastType(newType);
            setAlerts(current => [newAlert, ...current].slice(0, 4));
        } catch (error) {
            console.error('Error generating alert:', error);
        }
    };

    useEffect(() => {
        generateAlert(); // Initial alert
        const interval = setInterval(generateAlert, 60000); // Generate every minute
        
        return () => clearInterval(interval);
    }, []);

    return alerts;
}