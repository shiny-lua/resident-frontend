import Card from "./components/card"

const InterviewHelper = ({onNext}: {onNext: VoidFunction}) => {
    return (
        <div className="mt-10">
            <div className="text-title-md font-[600]">How can we help you crush your next interview?</div>
            <div className="mt-10 flex flex-col gap-4">
                <Card
                    title="I have an interview now"
                    desc="Get setup with our live interview assistant Copilot now and be ready with real-time responses."
                    subscribe="Premium"
                    onNext={onNext}
                />
                <Card
                    title="I need to prep for an interview"
                    desc="Get ready for your next interview with mock interviews, AI written cover letters, flashcards, and more."
                    subscribe="Free"
                    onNext={onNext}
                />
                <Card
                    title="I just want to explore"
                    desc="Take a tour of Theresidentguy, explore our AI resume builder and questions bank."
                    subscribe="Free"
                    onNext={onNext}
                />
            </div>
        </div>
    )
}

export default InterviewHelper