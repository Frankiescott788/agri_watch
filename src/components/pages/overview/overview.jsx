import { useContext, useEffect, useState } from "react";
import { Authcontext } from "../../../context/Authprovider";
import {
  Card,
  Divider,
  Image,
  User,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell
} from "@nextui-org/react";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { i, p } from "framer-motion/client";
import FarmLineGraph from "../../../charts/line";

const Overview = () => {
  const [hours, setHours] = useState("");
  const { currentUser } = useContext(Authcontext);

  const [weatherData, setWeatherData] = useState(null);
  const [summary, setSummary] = useState("");
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [isGenerating, setIsgenerating] = useState(false);

  const API_KEY = "6fcaddaefdf79e82f2dd23bb74194ed6"; // Replace with your OpenWeather API key
  const CITY_NAME = "polokwane"; // Replace with your desired city name

  // Initialize Gemini API
  const genAI = new GoogleGenerativeAI(
    "AIzaSyAAQd5fnpidGv4nU_ZklFBO0QjyEjsoURg"
  ); // Ensure you set the environment variable for your Gemini API key
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Fetch weather data from OpenWeather API
  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      await summarizeWeather(response.data); // Summarize the weather data
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoadingWeather(false);
    }
  };

  // Send weather data to Gemini API for summarization
  const summarizeWeather = async (weather) => {
    setLoadingSummary(true);
    const prompt = `Summarize the following weather data: ${JSON.stringify(
      weather
    )}, and give the farmer tips on how to manage their crops. after summarizing the weather tell the farmer what the weather is good for and what not good for according to the plants they are growing, then advise the farmer what it can do to make the crops that are affecting negatively more positive and also only give four tips each in only 15 words, remember only tips, just summarize as if you know the information about the user's crops, just mention fictional spots around the farm. make it less than 30 words `;

    try {
      const result = await model.generateContent(prompt);
      // Remove asterisks from the generated response
      const cleanedSummary = result.response.text().replace(/\*/g, "");
      setSummary(cleanedSummary);
      console.log(cleanedSummary); // Use the cleaned summary in the log
    } catch (error) {
      console.error("Error summarizing weather data:", error);
    } finally {
      setLoadingSummary(false);
      setIsgenerating(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  useEffect(() => {
    let hours = new Date().getHours();
    setHours(hours);
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const sensors = [
    { id: 1, type: "Soil Moisture", location: "North Field", status: "Active", lastChecked: "2024-10-11" },
    { id: 2, type: "Soil Moisture", location: "East Field", status: "Inactive", lastChecked: "2024-10-09" },
    { id: 3, type: "Soil Moisture", location: "South Field", status: "Active", lastChecked: "2024-10-11" },
    { id: 4, type: "Soil pH", location: "North Field", status: "Active", lastChecked: "2024-10-11" },
    { id: 5, type: "Temperature", location: "East Field", status: "Inactive", lastChecked: "2024-09-30" },
    { id: 6, type: "Humidity", location: "South Field", status: "Active", lastChecked: "2024-10-11" },
  ];

  return (
    <section>
      <div className="flex justify-between">
        <div>
          <p className="text-3xl">
            {" "}
            {hours < 12
              ? "Good Morning"
              : hours < 17
              ? "Good Afternoon"
              : "Good Evening"}
            , {currentUser?.firstName}{" "}
          </p>
          <p className="text-sm text-gray-400">Dashboard overview.</p>
        </div>
        <div className="flex gap-2">
          <Image
            className="h-[3rem] w-[3rem]"
            src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`}
          />
          <p className="mt-2">{weatherData?.weather[0].description}</p>
          <Divider orientation="vertical" className="h-[3rem]" />
          <p className="text-2xl mt-1">{weatherData?.main.temp}</p>
        </div>
      </div>
      <div className="grid grid-cols-12 py-3 gap-5">
        <Card className="col-span-3 p-4 ">
          <div className="flex justify-between" onClick={onOpen}>
            <div>
              <p className="text-xl text-gray-400">Spinach</p>
              <div className="flex gap-10">
                <p className="text-2xl">45 / 60</p>
                <p className="text-tiny mt-2 text-[#70e000]">
                  {(45 / 60) * 100}%
                </p>
              </div>
              <p className="text-success-400">sensors active</p>
            </div>
            <div className="flex mt-5">
              <Image src="" />
            </div>
          </div>
        </Card>
        <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Spinach sensors
                </ModalHeader>
                <ModalBody>
                <Table aria-label="Spinach Field Sensor Activity Table" bordered>
      <TableHeader>
        <TableColumn>Sensor Type</TableColumn>
        <TableColumn>Location</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Last Checked</TableColumn>
      </TableHeader>
      <TableBody>
        {sensors.map((sensor) => (
          <TableRow key={sensor.id}>
            <TableCell>{sensor.type}</TableCell>
            <TableCell>{sensor.location}</TableCell>
            <TableCell>{sensor.status === "Active" ? "🟢 Active" : "🔴 Inactive"}</TableCell>
            <TableCell>{sensor.lastChecked}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <Card className="col-span-3 p-4 ">
          <div className="flex justify-between">
            <div>
              <p className="text-xl text-gray-400">Tomatoes</p>
              <p className="text-2xl">58</p>
              <p className="text-success-400"> sensors active </p>
            </div>
            <div className="flex mt-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={32}
                height={32}
                color={"#3a86ff"}
                fill={"none"}
              >
                <path
                  d="M12.5 5.5H10.5C9.55719 5.5 9.08579 5.5 8.79289 5.79289C8.5 6.08579 8.5 6.55719 8.5 7.5V9.5C8.5 10.4428 8.5 10.9142 8.79289 11.2071C9.08579 11.5 9.55719 11.5 10.5 11.5H12.5C13.4428 11.5 13.9142 11.5 14.2071 11.2071C14.5 10.9142 14.5 10.4428 14.5 9.5V7.5C14.5 6.55719 14.5 6.08579 14.2071 5.79289C13.9142 5.5 13.4428 5.5 12.5 5.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 11.5H10V21.5H13V11.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.5 21.5H15.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.5 7H18.5C20.1569 7 21.5 8.34315 21.5 10V12.5H18.5V10H14.5V7Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.5 2.5H9.09949C7.83781 2.5 7.20696 2.5 6.70992 2.82302C6.21288 3.14603 5.95667 3.7225 5.44425 4.87545L2.5 11.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 15.5L20.5582 14.9991C20.4159 14.8406 20.213 14.75 20 14.75C19.787 14.75 19.5841 14.8406 19.4418 14.9991L20 15.5ZM20.75 18C20.75 18.4142 20.4142 18.75 20 18.75V20.25C21.2426 20.25 22.25 19.2426 22.25 18H20.75ZM20 18.75C19.5858 18.75 19.25 18.4142 19.25 18H17.75C17.75 19.2426 18.7574 20.25 20 20.25V18.75ZM19.25 18C19.25 18.003 19.2507 17.969 19.2771 17.8886C19.3022 17.8119 19.343 17.7162 19.4012 17.6031C19.5182 17.3759 19.6824 17.1227 19.8589 16.8772C20.0335 16.6345 20.2097 16.4137 20.3431 16.2528C20.4094 16.1727 20.4644 16.1084 20.5023 16.0646C20.5212 16.0428 20.5358 16.0262 20.5454 16.0153C20.5502 16.0099 20.5537 16.0059 20.5559 16.0035C20.557 16.0023 20.5577 16.0015 20.5581 16.001C20.5583 16.0008 20.5584 16.0007 20.5584 16.0007C20.5584 16.0007 20.5584 16.0007 20.5584 16.0007C20.5584 16.0007 20.5583 16.0008 20.5583 16.0008C20.5583 16.0008 20.5582 16.0009 20 15.5C19.4418 14.9991 19.4417 14.9992 19.4417 14.9992C19.4416 14.9993 19.4415 14.9994 19.4415 14.9994C19.4414 14.9996 19.4412 14.9997 19.441 14.9999C19.4407 15.0003 19.4403 15.0008 19.4397 15.0014C19.4387 15.0026 19.4373 15.0042 19.4355 15.0061C19.432 15.0101 19.4271 15.0156 19.4209 15.0226C19.4085 15.0367 19.3909 15.0568 19.3688 15.0822C19.3246 15.1332 19.2625 15.2059 19.1882 15.2955C19.0403 15.4739 18.8415 15.7228 18.6411 16.0015C18.4426 16.2774 18.2318 16.5975 18.0675 16.9166C17.9157 17.2115 17.75 17.6053 17.75 18H19.25ZM20 15.5C19.4418 16.0009 19.4417 16.0008 19.4417 16.0008C19.4417 16.0008 19.4416 16.0007 19.4416 16.0007C19.4416 16.0007 19.4416 16.0007 19.4416 16.0007C19.4416 16.0007 19.4417 16.0008 19.4419 16.001C19.4423 16.0015 19.443 16.0023 19.4441 16.0035C19.4463 16.0059 19.4498 16.0099 19.4546 16.0153C19.4642 16.0262 19.4788 16.0428 19.4977 16.0646C19.5356 16.1084 19.5906 16.1727 19.6569 16.2528C19.7903 16.4137 19.9665 16.6345 20.1411 16.8772C20.3176 17.1227 20.4818 17.3759 20.5988 17.6031C20.657 17.7162 20.6978 17.8119 20.7229 17.8886C20.7493 17.969 20.75 18.003 20.75 18H22.25C22.25 17.6053 22.0843 17.2115 21.9325 16.9166C21.7682 16.5975 21.5574 16.2774 21.3589 16.0015C21.1585 15.7228 20.9597 15.4739 20.8118 15.2955C20.7375 15.2059 20.6754 15.1332 20.6312 15.0822C20.6091 15.0568 20.5915 15.0367 20.5791 15.0226C20.5729 15.0156 20.568 15.0101 20.5645 15.0061C20.5627 15.0042 20.5613 15.0026 20.5603 15.0014C20.5597 15.0008 20.5593 15.0003 20.559 14.9999C20.5588 14.9997 20.5586 14.9996 20.5585 14.9994C20.5585 14.9994 20.5584 14.9993 20.5583 14.9992C20.5583 14.9992 20.5582 14.9991 20 15.5Z"
                  fill="currentColor"
                />
                <path
                  d="M11.5 2.5V5.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </Card>
        <Card className="col-span-3 p-4 ">
          <div className="flex justify-between">
            <div>
              <p className="text-xl text-gray-400">Water Usage</p>
              <p className="text-2xl">34L</p>
              <p className="text-success-400">Daily</p>
            </div>
            <div className="flex mt-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={32}
                height={32}
                color={"#3a86ff"}
                fill={"none"}
              >
                <path
                  d="M12.5 5.5H10.5C9.55719 5.5 9.08579 5.5 8.79289 5.79289C8.5 6.08579 8.5 6.55719 8.5 7.5V9.5C8.5 10.4428 8.5 10.9142 8.79289 11.2071C9.08579 11.5 9.55719 11.5 10.5 11.5H12.5C13.4428 11.5 13.9142 11.5 14.2071 11.2071C14.5 10.9142 14.5 10.4428 14.5 9.5V7.5C14.5 6.55719 14.5 6.08579 14.2071 5.79289C13.9142 5.5 13.4428 5.5 12.5 5.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 11.5H10V21.5H13V11.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.5 21.5H15.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.5 7H18.5C20.1569 7 21.5 8.34315 21.5 10V12.5H18.5V10H14.5V7Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.5 2.5H9.09949C7.83781 2.5 7.20696 2.5 6.70992 2.82302C6.21288 3.14603 5.95667 3.7225 5.44425 4.87545L2.5 11.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 15.5L20.5582 14.9991C20.4159 14.8406 20.213 14.75 20 14.75C19.787 14.75 19.5841 14.8406 19.4418 14.9991L20 15.5ZM20.75 18C20.75 18.4142 20.4142 18.75 20 18.75V20.25C21.2426 20.25 22.25 19.2426 22.25 18H20.75ZM20 18.75C19.5858 18.75 19.25 18.4142 19.25 18H17.75C17.75 19.2426 18.7574 20.25 20 20.25V18.75ZM19.25 18C19.25 18.003 19.2507 17.969 19.2771 17.8886C19.3022 17.8119 19.343 17.7162 19.4012 17.6031C19.5182 17.3759 19.6824 17.1227 19.8589 16.8772C20.0335 16.6345 20.2097 16.4137 20.3431 16.2528C20.4094 16.1727 20.4644 16.1084 20.5023 16.0646C20.5212 16.0428 20.5358 16.0262 20.5454 16.0153C20.5502 16.0099 20.5537 16.0059 20.5559 16.0035C20.557 16.0023 20.5577 16.0015 20.5581 16.001C20.5583 16.0008 20.5584 16.0007 20.5584 16.0007C20.5584 16.0007 20.5584 16.0007 20.5584 16.0007C20.5584 16.0007 20.5583 16.0008 20.5583 16.0008C20.5583 16.0008 20.5582 16.0009 20 15.5C19.4418 14.9991 19.4417 14.9992 19.4417 14.9992C19.4416 14.9993 19.4415 14.9994 19.4415 14.9994C19.4414 14.9996 19.4412 14.9997 19.441 14.9999C19.4407 15.0003 19.4403 15.0008 19.4397 15.0014C19.4387 15.0026 19.4373 15.0042 19.4355 15.0061C19.432 15.0101 19.4271 15.0156 19.4209 15.0226C19.4085 15.0367 19.3909 15.0568 19.3688 15.0822C19.3246 15.1332 19.2625 15.2059 19.1882 15.2955C19.0403 15.4739 18.8415 15.7228 18.6411 16.0015C18.4426 16.2774 18.2318 16.5975 18.0675 16.9166C17.9157 17.2115 17.75 17.6053 17.75 18H19.25ZM20 15.5C19.4418 16.0009 19.4417 16.0008 19.4417 16.0008C19.4417 16.0008 19.4416 16.0007 19.4416 16.0007C19.4416 16.0007 19.4416 16.0007 19.4416 16.0007C19.4416 16.0007 19.4417 16.0008 19.4419 16.001C19.4423 16.0015 19.443 16.0023 19.4441 16.0035C19.4463 16.0059 19.4498 16.0099 19.4546 16.0153C19.4642 16.0262 19.4788 16.0428 19.4977 16.0646C19.5356 16.1084 19.5906 16.1727 19.6569 16.2528C19.7903 16.4137 19.9665 16.6345 20.1411 16.8772C20.3176 17.1227 20.4818 17.3759 20.5988 17.6031C20.657 17.7162 20.6978 17.8119 20.7229 17.8886C20.7493 17.969 20.75 18.003 20.75 18H22.25C22.25 17.6053 22.0843 17.2115 21.9325 16.9166C21.7682 16.5975 21.5574 16.2774 21.3589 16.0015C21.1585 15.7228 20.9597 15.4739 20.8118 15.2955C20.7375 15.2059 20.6754 15.1332 20.6312 15.0822C20.6091 15.0568 20.5915 15.0367 20.5791 15.0226C20.5729 15.0156 20.568 15.0101 20.5645 15.0061C20.5627 15.0042 20.5613 15.0026 20.5603 15.0014C20.5597 15.0008 20.5593 15.0003 20.559 14.9999C20.5588 14.9997 20.5586 14.9996 20.5585 14.9994C20.5585 14.9994 20.5584 14.9993 20.5583 14.9992C20.5583 14.9992 20.5582 14.9991 20 15.5Z"
                  fill="currentColor"
                />
                <path
                  d="M11.5 2.5V5.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </Card>
        <Card className="col-spam-6">r</Card>
        <Card className="col-span-3 absolute right-0 w-[20rem] mx-2 h-[30rem]">
          <div className="border-b p-2">
            <User
              name={"Weather summary overview"}
              description="Powered by Agribot"
              avatarProps={{
                src: "data:image/jpeg;base64,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",
              }}
            />
          </div>
          <div className="h-[25rem] p-2 overflow-y-auto scrollbar-scroll">
            <p className="text-gray-400 text-normal">
              {summary.length === 0 ? (
                <div className="flex justify-center margin mt-[40%]">
                  <div className="loading">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              ) : (
                <p className="summary-text">{summary}</p>
              )}
            </p>
          </div>
          <div className="border-t">
            <p className="text-gray-400 text-tiny p-2">
              Agribot can make mistakes. Check important info.
            </p>
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-12">
        <Card className="col-span-9 p-3 mx-4">
          <p className="text-gray-400"> Farm Analystics </p>
          <FarmLineGraph />
        </Card>
      </div>
    </section>
  );
};
export default Overview;
