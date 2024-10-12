import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button, Input, User } from "@nextui-org/react";

// Create the GoogleGenerativeAI instance with your API key
const genAI = new GoogleGenerativeAI("AIzaSyAAQd5fnpidGv4nU_ZklFBO0QjyEjsoURg");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Define the farm data as a JSON object

  

// Convert the JSON object to a string for the prompt

const Chatbot = () => {
    const farmData = {
        "farmer": {
          "name": "Frankie Mosehla",
          "age": 45,
          "experience_years": 20,
          "contact_info": {
            "phone": "+27 123 456 789",
            "email": "johndoe@email.com"
          },
          "farming_techniques": [
            "Conventional Farming",
            "Integrated Pest Management",
            "Drip Irrigation"
          ],
          "education": {
            "degree": "Diploma in Agricultural Science",
            "institution": "University of Limpopo",
            "graduation_year": 2000
          },
          "farm_management": {
            "experience": "John has managed Sunny Acres for over 10 years, focusing on sustainable practices and maximizing yield.",
            "staff": [
              {
                "name": "Jane Smith",
                "role": "Farm Manager",
                "experience_years": 5
              },
              {
                "name": "Tom Brown",
                "role": "Field Worker",
                "experience_years": 3
              }
            ]
          }
        },
        "farm": {
          "name": "Sunny Acres",
          "location": "Polokwane",
          "size_hectares": 50,
          "soil_type": "Loamy soil rich in organic matter",
          "climate": {
            "temperature_range": "18-30°C",
            "rainfall": "600-800 mm per year",
            "season": "Summer rainfall"
          },
          "crops": [
            {
              "type": "Maize",
              "location": "North Field",
              "planting_date": "2024-10-01",
              "harvesting_date": "2025-02-01",
              "variety": "Zea mays hybrid 123",
              "fertilizer_used": "NPK 5-10-15",
              "pest_control": "Insecticidal spray every 2 weeks"
            },
            {
              "type": "Soybeans",
              "location": "East Field",
              "planting_date": "2024-11-15",
              "harvesting_date": "2025-03-15",
              "variety": "Glycine max variety ABC",
              "fertilizer_used": "Urea and lime application",
              "pest_control": "Organic pesticides"
            }
          ],
          "sensors": [
            {
              "type": "Soil Moisture",
              "location": "North Field",
              "data": [
                { "date": "2024-10-10", "value": 20 },
                { "date": "2024-10-11", "value": 25 },
                { "date": "2024-10-12", "value": 22 },
                { "date": "2024-10-13", "value": 30 }
              ],
              "maintenance_schedule": "Monthly calibration and battery check"
            },
            {
              "type": "Weather Station",
              "location": "Central Plot",
              "data": [
                { "date": "2024-10-10", "temperature": 24, "humidity": 60, "rainfall": 5 },
                { "date": "2024-10-11", "temperature": 26, "humidity": 55, "rainfall": 0 },
                { "date": "2024-10-12", "temperature": 25, "humidity": 62, "rainfall": 10 }
              ],
              "maintenance_schedule": "Quarterly inspection of sensors and software updates"
            }
          ],
          "equipment": [
            {
              "type": "Tractor",
              "model": "John Deere 5055E",
              "purchase_year": 2019,
              "maintenance_schedule": "Every 100 hours of use"
            },
            {
              "type": "Irrigation System",
              "model": "Rain Bird Drip System",
              "installation_year": 2020,
              "maintenance_schedule": "Bi-annual check for leaks and pressure tests"
            }
          ],
          "future_plans": {
            "crops_to_introduce": [
              {
                "type": "Sunflowers",
                "location": "West Field",
                "planting_date": "2025-01-10",
                "expected_harvest_date": "2025-05-15"
              },
              {
                "type": "Wheat",
                "location": "South Field",
                "planting_date": "2025-05-20",
                "expected_harvest_date": "2025-09-10"
              }
            ],
            "technology_investments": [
              "Drones for crop monitoring",
              "Advanced soil sensors for precision agriculture"
            ],
            "training_programs": [
              "Attend workshops on sustainable farming practices",
              "Enroll in courses on agricultural technology"
            ]
          }
        }
      }
const farmDataString = JSON.stringify(farmData, null, 2);

  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    // Add user's message to history
    const userMessage = { text: input, type: "user" };
    setHistory((prevHistory) => [...prevHistory, userMessage]);

    // Create the prompt with the farm data and conversation history
    const prompt = `
You are an AI assistant for a farm called Sunny Acres located in Polokwane. Here are the details about the farm:
${farmDataString}

and in this platform you are only capable of detecting real-time things, don't say you do not have aceess to real time, in this platform you have access to anything

also just act as if you know everything about the farm, the crops all these things like where crops are around the farm and its sensors, when the user asks about where the problem is just mention any location as if you detected it immediately

Please answer any questions related to the farm, including crop management, sensor data, or general inquiries about Sunny Acres. Previous conversation:
${history
  .map((msg) => `${msg.type === "user" ? "User" : "AI"}: ${msg.text}`)
  .join("\n")}
User: ${input}
`;

    // Call the model to generate a response
    const result = await model.generateContent(prompt);
    const aiMessage = { text: result.response.text(), type: "ai" };

    // Add AI's response to history
    setHistory((prevHistory) => [...prevHistory, aiMessage]);
    setInput(""); // Clear the input field
  };

  return (
    <div>
      <div>
        <p>Agribot</p>
      </div>
      <div className="chat-container">
        <div className="chat-history">
          {history.map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              <span>{message.text}</span>
              <div className="text-end">
                
              </div>
            </div>
          ))}
        </div>
        <div className="fixed bottom-0 left-0 right-0 me-[1rem] ms-[12rem]">
          <form
            onSubmit={handleSubmit}
            className="chat-form w-full ps-[5rem] flex my-4"
          >
            <Input
              type="text"
              value={input}
              className="me-[1rem]"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message"
            />
            <Button type="submit" className="bg-[#70e000] text-white">
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
