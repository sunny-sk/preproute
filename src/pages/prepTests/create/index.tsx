import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import StepperInput from "@/components/stepper-input"
import { DIFFICULTY_LEVELS } from "@/constant"
import Breadcrum from "../../../components/breadcrum"
import Tabs from "./components/tabs"
import Subjects from "@/components/subjects"
import Topic from "@/components/topic"
import SubTopics from "@/components/sub-topics"




const labelClass = "mb-2 block text-sm font-medium text-[#33415c]"
const controlClass =
  "h-12 w-full rounded-lg border-[#e4e9f4] px-4 text-sm text-[#33415c] shadow-none placeholder:text-[#9aa6be] focus-visible:ring-2 data-[size=default]:h-12"





const TaskCreate = () => {
  const [difficulty, setDifficulty] = useState("easy")
  const [wrongAnswer, setWrongAnswer] = useState(-1)
  const [unattempted, setUnattempted] = useState(0)
  const [correctAnswer, setCorrectAnswer] = useState(5)
  const [noOfQuestions, setNoOfQuestions] = useState("")
  const [subjectId, setSubjectId] = useState<string | null>(null)
  const [topicId, setTopicId] = useState<string | null>(null)
  const [subTopicId, setSubTopicId] = useState<string | null>(null)
  const totalMarks = noOfQuestions ? Number(noOfQuestions) * correctAnswer : 0





  return (
    <div className="border-[#eef2fb] bg-white p-8">
      {/* Breadcrumb */}
      <Breadcrum
        items={[
          { label: "Test Creation" },
          { label: "Create Test" },
          { label: "Chapter Wise" },
        ]}
      />

      {/* Tabs */}
      <Tabs />

      {/* Form */}
      <form className="mt-8">
        <div className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
          {/* Subject */}
          <Subjects labelClass={labelClass} controlClass={controlClass} onChange={setSubjectId} />

          {/* Name of Test */}
          <div>
            <label htmlFor="testName" className={labelClass}>
              Name of Test
            </label>
            <Input id="testName" type="text" placeholder="Enter name of Test" className={controlClass} />
          </div>

          {/* Topic */}
          <Topic labelClass={labelClass} controlClass={controlClass} onChange={setTopicId} subjectId={subjectId} />

          {/* Sub Topic */}
          <SubTopics labelClass={labelClass} controlClass={controlClass} onChange={setSubTopicId} topicId={topicId} />

          {/* Duration */}
          <div>
            <label htmlFor="duration" className={labelClass}>
              Duration (Minutes)
            </label>
            <Input id="duration" type="number" min={0} placeholder="Enter the time" className={controlClass} />
          </div>

          {/* Test Difficulty Level */}
          <div>
            <span className={labelClass}>Test Difficulty Level</span>
            <RadioGroup
              value={difficulty}
              onValueChange={(value) => setDifficulty(value as string)}
              className="flex flex-row items-center gap-10 pt-3"
            >
              {DIFFICULTY_LEVELS.map((level) => (
                <label
                  key={level.id}
                  className="flex cursor-pointer items-center gap-2 text-sm text-[#33415c]"
                >
                  <RadioGroupItem value={level.id} />
                  {level.label}
                </label>
              ))}
            </RadioGroup>
          </div>
        </div>

        {/* Marking Scheme */}
        <h2 className="mt-8 text-sm font-medium text-[#33415c]">Marking Scheme:</h2>
        <div className="mt-4 grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
          <div className="flex flex-wrap gap-6">
            <div>
              <span className={labelClass}>Wrong Answer</span>
              <StepperInput id="wrong-answer" value={wrongAnswer} onChange={setWrongAnswer} />
            </div>
            <div>
              <span className={labelClass}>Unattempted</span>
              <StepperInput id="unattempted" value={unattempted} onChange={setUnattempted} />
            </div>
            <div>
              <span className={labelClass}>Correct Answer</span>
              <StepperInput id="correct-answer" value={correctAnswer} onChange={setCorrectAnswer} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="noOfQuestions" className={labelClass}>
                No of Questions
              </label>
              <Input
                id="noOfQuestions"
                type="number"
                min={0}
                value={noOfQuestions}
                onChange={(event) => setNoOfQuestions(event.target.value)}
                placeholder="Ex:250 Marks"
                className={controlClass}
              />
            </div>
            <div>
              <label htmlFor="totalMarks" className={labelClass}>
                Total Marks
              </label>
              <Input
                id="totalMarks"
                type="text"
                readOnly
                value={totalMarks ? `${totalMarks}` : ""}
                placeholder="Ex:250 Marks"
                className={`${controlClass} bg-[#f8faff] text-[#9aa6be]`}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 flex justify-end gap-3">
          <Button
            type="button"
            variant="ghost"
            className="h-11 rounded-lg bg-[#f1f3fc] px-8 text-sm font-medium text-[#7581a0] hover:bg-[#e8ecf9]"
          >
            Cancel
          </Button>
          <Button type="submit" className="h-11 rounded-lg px-10 text-sm font-medium">
            Next
          </Button>
        </div>
      </form>
    </div>
  )
}

export default TaskCreate
