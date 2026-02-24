import {Minus, Plus} from "lucide-react";
import React, {useState} from "react";

const faqsItem = ({question, answer} : {question: string, answer: string}) =>{
    const [isFaq, setIsFaq] = useState(false)
    const containerRef = React.useRef<HTMLDivElement>(null);
    return (
        <div ref={containerRef}
             className="w-6/12 mx-auto bg-spring-wood-50 rounded-xl pb-14 pt-6 px-6 overflow-hidden transition-all duration-1000 ease-in-out"
             style={{maxHeight: isFaq ? `${containerRef.current?.scrollHeight}px` : '0px'}}
        >
            <div className="flex justify-between">
                <p>{question}</p>
                {
                    !isFaq ? <Plus color='gray' className="cursor-pointer" onClick={() => setIsFaq(true)}/> :
                        <Minus color='gray' className="cursor-pointer" onClick={() => setIsFaq(false)}/>
                }
            </div>
            <div className="pt-10">
                <p>{answer}</p>
            </div>
        </div>
    )
}

export default faqsItem;