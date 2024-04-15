export default function OnboardingPage() {
    return(
        <main className="mx-auto flex flex-col px-10 py-20">
            <h1 className="head-text">Onboarding</h1>
            <p className="mt-4 text-light-2 text-base-regular">{`👋 Welcome! You're officially part of the team. Let's start this exciting journey together! 🚀`}</p>

            <section className="mt-9 bg-dark-2 py-10">
                <AccountProfile />
            </section>
        </main>
    )
}