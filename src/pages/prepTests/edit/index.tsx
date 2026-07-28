import { Controller, useForm, useWatch } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"



import StepperInput from "@/components/stepper-input"
import { DIFFICULTY_LEVELS } from "@/constant"
import Breadcrum from "../../../components/breadcrum"
import Subjects from "@/components/subjects"
import Topic from "@/components/topic"
import SubTopics from "@/components/sub-topics"
import { TestType } from "@/types"
import TestTypeInput from "../../../components/test-type-input"
import { createTestApi } from "@/services/tests"
import { toast } from "@/components/ui/toast"
import { createTestValidationSchema, type CreateTest, type CreateTestPayload } from "@/validations"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { useNavigate, useParams } from "react-router"




const labelClass = "mb-2 block text-sm font-medium text-[#33415c]"
const controlClass =
  "h-12 w-full rounded-lg border-[#e4e9f4] px-4 text-sm text-[#33415c] shadow-none placeholder:text-[#9aa6be] focus-visible:ring-2 data-[size=default]:h-12"



const TaskEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTest>({
    resolver: zodResolver(createTestValidationSchema),
    defaultValues: {
      type: TestType.CHAPTERWISE,
      testName: "",
      subjectId: "",
      topicId: [],
      subTopicId: [],
      duration: 0,
      difficulty: "easy",
      wrongAnswer: -1,
      unattempted: 0,
      correctAnswer: 5,
      noOfQuestions: 0,
      status: "draft",
    },
  })

  const type = useWatch({ control, name: "type" })
  const subjectId = useWatch({ control, name: "subjectId" })
  const topicId = useWatch({ control, name: "topicId" })
  const correctAnswer = useWatch({ control, name: "correctAnswer" })

  const totalMarks = 10;
  const onSubmit = async (values: CreateTest) => {
    try {
      const totalMarks = values.noOfQuestions ? Number(values.noOfQuestions) * correctAnswer : 0
      const payload: CreateTestPayload = {
        name: values.testName,
        type: values.type,
        subject: values.subjectId,
        topics: values.topicId,
        sub_topics: values.subTopicId,
        correct_marks: values.correctAnswer,
        wrong_marks: values.wrongAnswer,
        unattempt_marks: values.unattempted,
        difficulty: values.difficulty,
        total_time: values.duration,
        total_marks: totalMarks,
        total_questions: values.noOfQuestions,
        status: values.status,
      }

      const response = await createTestApi(payload);
      console.log(response)
      if (response.status === "success") {
        toast.add({
          title: "Test created successfully",
          description: response.message,
        });
        const testId = response.data.id;
        navigate(`/task/create/${testId}/questions`);
      } else {
        toast.add({
          title: "Failed to create test",
          description: response.message,
        })
      }
    } catch (error) {
      const errorResponse = error.response?.data;
      if (errorResponse.status === "error") {
        const description = errorResponse.errors[0]?.msg;
        toast.add({
          title: "Failed to create test",
          description: description,
        })
      } else {
        toast.add({
          title: "Failed to create test",
          description: "Something went wrong",
        })
      }
    }
  }

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
      <TestTypeInput
        activeTab={type}
        setActiveTab={(tab) => setValue("type", tab)}
      />

      {/* Form */}
      <form id="create-test-form" className="mt-8" onSubmit={handleSubmit(onSubmit)} >
        <div className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
          {/* Subject */}
          <div>
            <Controller
              name="subjectId"
              control={control}
              render={({ field, fieldState }) => (
                <Subjects
                  {...field}
                  labelClass={labelClass}
                  controlClass={controlClass}
                  dataInvalid={fieldState.invalid}
                  errors={errors}
                  onChange={(value) => {
                    field.onChange(value ?? "")
                    setValue("topicId", [])
                    setValue("subTopicId", [])
                  }}
                />
              )}
            />

          </div>

          {/* Name of Test */}
          <div>
            <Controller
              name="testName"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className={labelClass} htmlFor="testName">
                    Name of Test
                  </FieldLabel>
                  <Input
                    {...field}
                    id="testName"
                    type="text"
                    className={controlClass}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Name of Test"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Topic */}
          <div>
            <Controller
              name="topicId"
              control={control}
              render={({ field, fieldState }) => (
                <Topic
                  {...field}
                  labelClass={labelClass}
                  controlClass={controlClass}
                  subjectId={subjectId}
                  dataInvalid={fieldState.invalid}
                  errors={errors}
                  onChange={(value) => {
                    field.onChange(value)
                    // clear sub-topics that may no longer belong to the selected topics
                    setValue("subTopicId", [])
                  }}
                />

              )}
            />
          </div>

          {/* Sub Topic */}
          <div>
            <Controller
              name="subTopicId"
              control={control}
              render={({ field, fieldState }) => (
                <SubTopics
                  {...field}
                  labelClass={labelClass}
                  controlClass={controlClass}
                  topicIds={topicId}
                  value={field.value}
                  dataInvalid={fieldState.invalid}
                  errors={errors}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          {/* Duration */}
          <div>
            <Controller
              name="duration"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className={labelClass} htmlFor="duration">
                    Duration (Minutes)
                  </FieldLabel>
                  <Input
                    {...field}
                    id="duration"
                    type="number"
                    min={0}
                    placeholder="Enter the time"
                    className={controlClass}
                    aria-invalid={fieldState.invalid}
                    value={Number.isNaN(field.value) ? "" : field.value}
                    onChange={(event) => field.onChange(event.target.valueAsNumber)}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

          </div>

          {/* Test Difficulty Level */}
          <div>
            <span className={labelClass}>Test Difficulty Level</span>
            <Controller
              name="difficulty"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
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
              )}
            />
          </div>
        </div>

        {/* Marking Scheme */}
        <h2 className="mt-8 text-sm font-medium text-[#33415c]">Marking Scheme:</h2>
        <div className="mt-4 grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
          <div className="flex flex-wrap gap-6">
            <div>
              <span className={labelClass}>Wrong Answer</span>
              <Controller
                name="wrongAnswer"
                control={control}
                render={({ field }) => (
                  <StepperInput
                    id="wrong-answer"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div>

              <Controller
                name="unattempted"
                control={control}
                render={({ field }) => (
                  <>
                    <span className={labelClass}>Unattempted</span>
                    <StepperInput
                      id="unattempted"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </>
                )}
              />
            </div>
            <div>

              <Controller
                name="correctAnswer"
                control={control}
                render={({ field }) => (
                  <>
                    <span className={labelClass}>Correct Answer</span>
                    <StepperInput
                      id="correct-answer"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <Controller
                name="noOfQuestions"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className={labelClass} htmlFor="noOfQuestions">
                      No of Questions
                    </FieldLabel>
                    <Input
                      {...field}
                      id="noOfQuestions"
                      type="number"
                      min={0}
                      placeholder="Ex:250 Marks"
                      className={controlClass}
                      aria-invalid={fieldState.invalid}
                      value={Number.isNaN(field.value) ? "" : field.value}
                      onChange={(event) => field.onChange(event.target.valueAsNumber)}
                    />
                    {errors.noOfQuestions && (
                      <FieldError errors={[errors.noOfQuestions]} />
                    )}
                  </Field>
                )}
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
            disabled={isSubmitting}
            onClick={() => reset()}
            className="h-11 rounded-lg bg-[#f1f3fc] px-8 text-sm font-medium text-[#7581a0] hover:bg-[#e8ecf9]"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-11 rounded-lg px-10 text-sm font-medium"
          >
            {isSubmitting && <Loader size={20} />} Save
          </Button>
        </div>
      </form>
    </div>
  )
}

export default TaskEdit
