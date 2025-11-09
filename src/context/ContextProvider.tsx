import React, { createContext, ReactNode } from "react";
import runChat from "../config/Gemini";
import runChatOpenIa from "../config/openIA";

interface ContextType {
  prevPrompts: string[];
  setPrevPrompts: React.Dispatch<React.SetStateAction<string[]>>;
  recentPrompt: string;
  setRecentPrompt: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  showResult: boolean;
  result: string;
  onSentPrompt: (prompt: string) => Promise<void>;
  newChat?: () => void;
}

export const ContextHook = createContext<ContextType>({} as ContextType);

interface ContextProviderProps {
  children: ReactNode;
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {

  const [input, setInput] = React.useState<string>("");
  const [recentPrompt, setRecentPrompt] = React.useState<string>("");
  const [prevPrompts, setPrevPrompts] = React.useState<string[]>([]);
  const [showResult, setShowResult] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [result, setResult] = React.useState<string>("");

  const delayParams = (ms: number, nextWord: string): void => {
    setTimeout(() => {
      setResult((prev) => prev + nextWord);
    }, 80 * ms);
  }

  const newChat = () => {
    setIsLoading(false);
    setShowResult(false);
    setResult("");
  }

  const onSentPromptOpenIa = async (prompt: string) => {
    const openIaResponse = await runChatOpenIa(recentPrompt);
    console.log("OpenIA Response:", openIaResponse.text);
  }

  const onSentPrompt = async (prompt: string) => {
    setResult("");
    setIsLoading(true);
    setShowResult(true);
    let response: { text?: string } = { text: "" };
    if (prompt !== undefined && prompt !== "") {
      response = await runChat(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await runChat(recentPrompt);
    }

    let resposeArray = response.text?.split("**") || [];
    let firstResponse = "";
    for (let i = 0; i < resposeArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        firstResponse += resposeArray[i];
      } else {
        firstResponse += resposeArray[i];
      }
    }
    let seconde = firstResponse.split("*").join("");
    let newResponseArray = seconde.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const word = newResponseArray[i] + " ";
      delayParams(i, word);
    }
    //setResult(newResponse2 || "No response");
    setIsLoading(false);
    setInput("");
  }

  onSentPromptOpenIa("Hello, Gemini!");

  const contextValue: ContextType = {
    prevPrompts,
    setPrevPrompts,
    recentPrompt,
    setRecentPrompt,
    isLoading,
    input,
    setInput,
    showResult,
    result,
    onSentPrompt,
    newChat,
  };

  return (
    <ContextHook.Provider value={contextValue}>
      {children}
    </ContextHook.Provider>
  );
};

export default ContextProvider;

