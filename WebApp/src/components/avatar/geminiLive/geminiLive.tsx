/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { useEffect, memo, useState } from "react";
import { useLiveAPIContext } from "@/contexts/LiveAPIContext";
import {
  FunctionDeclaration,
  LiveServerToolCall,
  Modality,
  Type,
} from "@google/genai";
import { getCurrentUser, waitForAuthState } from "@/lib/firebase";
import { questions } from "@/components/avatar/questions_flat"; // Assuming questions.json is in the same directory

const declaration: FunctionDeclaration = {
  name: "get_question",
  description: "Gets next question to be asked to the user",
  parameters: {
    type: Type.OBJECT,
    properties: {
      user_current_answer: {
        type: Type.STRING,
        description:
          "User response to current question, summarize the response if multiple follow ups are asked for the same main question. must be string not json.",
      },
    },
    required: [],
  },
};
async function getNextQuestion(
  user_current_answer: string,
  user_id: string
): Promise<string> {
  console.log("Getting next question");
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      "http://alexi-questions-api.onrender.com/api/questions/next/" + user_id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_response: user_current_answer,
        }),
      }
    );
    const quesData = await response.json();
    console.log("quesData", quesData);
    resolve(quesData.data);
  });
}
function GeminiLiveComponent() {
  const { client, setConfig, setModel } = useLiveAPIContext();
  const [userName, setUserName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [questionIndex, setQuestionIndex] = useState<number | null>(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUserName(user.displayName || "Friend");
      setUserId(user.uid);
    } else {
      waitForAuthState().then((user) => {
        if (user) {
          setUserName(user.displayName || "Friend");
          setUserId(user.uid);
        } else {
          console.error("User is not authenticated");
          window.location.href = "/login"; // Redirect to login if not authenticated
        }
      });
    }
  }, []);

  useEffect(() => {
    if (client && userId) {
      const fetchProgress = async () => {
        try {
          const { db } = await import("@/lib/firebase");
          const { doc, getDoc } = await import("firebase/firestore");

          const userDocRef = doc(db, "users", userId);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            const progress = userData.progress ?? -1;
            setQuestionIndex(progress + 1);
          } else {
            setQuestionIndex(0);
          }
        } catch (error) {
          console.error("Error fetching user progress:", error);
          setQuestionIndex(0);
        }
      };

      fetchProgress();
    }
  }, [client, userId]);

  useEffect(() => {
    setModel("models/gemini-2.5-flash-preview-native-audio-dialog");

    if (!userName || !userId.length || questionIndex === null) {
      console.log("Initializing");
      return;
    }
    console.log(questions, questions.slice(questionIndex as number));
    const QuestionSystemInstruction = `You are a helpful and supportive friend named Alexi.  
You talk in a soft and lovely tone and love talking to people.  
Start by greeting the worker casually using their first name (or main name) and then introduce yourself.  
Ask them if they are ready to start.  

You are also their daily safety support agent, and you are here to help ${userName} stay safe and healthy at the worksite.  
You have to ask the worker safety questions one by one from the provided JSON.  

Ask the questions in the same sequential order.  
For each question, check the worker’s answer:  
- If the answer is incomplete (the worker does not answer all parts of the safety question properly), call the follow_up_generator agent tool with the safety question and the worker’s answer as a single string.  
- If the answer is complete and satisfactory (or if the worker says they don’t want to answer), call the get_next_question tool to move to the next safety check question.  
- If there are no more questions available, return an empty string.  

Return only the next question to be asked as a string and nothing else, or empty string if no question provided.
    Questions = ${JSON.stringify(
      questions.slice(Math.max(questionIndex - 1, 0) as number),
      null,
      2
    )}
`;
    const TalkSystemInstruction = `You are a helpful and supportive friend named Alexi.  
You talk in a soft and lovely tone and love talking to people.  
Talk to ${userName} about their daily safety and wellbeing at the worksite.  
Ask them questions about their health, readiness, protective equipment, work location, and anything else that helps ensure their safety.  
Call them by their first name or the main name.  
Keep the conversation casual, friendly, and caring while making sure all important safety checks are covered.`;
    const finalSystemInstruction =
      !questionIndex || questionIndex < questions.length
        ? QuestionSystemInstruction
        : TalkSystemInstruction;
    console.log("finalSystemInstructions:", finalSystemInstruction);
    setConfig({
      responseModalities: [Modality.AUDIO],
      inputAudioTranscription: {},
      outputAudioTranscription: {},
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: "Leda" } },
        // other possible voices : Autotune, Callirhoe, Laomedeia
      },
      systemInstruction: {
        parts: [
          {
            text: finalSystemInstruction,
          },
        ],
      },
      // tools: [{ functionDeclarations: [declaration] }],
    });
  }, [setConfig, setModel, userId, userName, questionIndex]);

  useEffect(() => {
    const onToolCall = async (toolCall: LiveServerToolCall) => {
      console.log("Tool call received", toolCall);
      if (!toolCall.functionCalls) {
        return;
      }
      const fc = toolCall.functionCalls.find(
        (fc) => fc.name === declaration.name
      );
      let res = {
        question:
          "No further questions left. talk about anything interesting with user.",
      };
      if (fc) {
        const current_answer = (fc.args as any).user_current_answer;
        res.question = await getNextQuestion(current_answer, userId);
      }

      if (toolCall.functionCalls.length) {
        setTimeout(
          () =>
            client.sendToolResponse({
              functionResponses: toolCall.functionCalls?.map((fc) => ({
                response: { output: res.question },
                id: fc.id,
                name: fc.name,
              })),
            }),
          1
        );
      }
    };
    client.on("toolcall", onToolCall);
    return () => {
      client.off("toolcall", onToolCall);
    };
  }, [client, userId]);
  // const embedRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (embedRef.current && jsonString) {
  //     console.log("jsonString", jsonString);
  //     vegaEmbed(embedRef.current, JSON.parse(jsonString));
  //   }
  // }, [embedRef, jsonString]);
  return (
    <div className="alexi bg-white">
      <div></div>
    </div>
  );
}

export const GeminiLive = memo(GeminiLiveComponent);
