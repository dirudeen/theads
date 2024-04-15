import AccountProfile from "@/components/form/AccountProfile";
import { currentUser } from "@clerk/nextjs";

export default async function OnboardingPage() {
    const user = await currentUser();

    // dummy userInfo
    const userInfo = {name: "foo", bio: "", image: "", id: "", username: ""}
    const userData = {
        id: user?.id,
        objectId: userInfo.id,
        username: userInfo?.username || user?.username || "",
        name: userInfo?.name || user?.username || "",
        bio: userInfo?.bio || "",
        image: userInfo.image || user?.imageUrl
    }
    return(
        <main className="mx-auto flex flex-col px-10 py-20">
            <h1 className="head-text">Onboarding</h1>
            <p className="mt-4 text-light-2 text-base-regular">{`👋 Welcome! You're officially part of the team. Let's start this exciting journey together! 🚀`}</p>

            <section className="mt-9 bg-dark-2 p-10">
                <AccountProfile user={userData} btnTitle="Continue" />
            </section>
        </main>
    )
}