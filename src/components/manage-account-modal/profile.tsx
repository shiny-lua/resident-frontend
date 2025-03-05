import ConnectedAccounts from "./connected-account";
import EmailAddress from "./email-address";
import ProfileContent from "./profile-content"

const Profile = () => {
    return (
        <div className="lg:w-2/3 border rounded-lg pt-8 px-4 lg:px-6 overflow-y-auto max-h-[calc(100dvh-48px)] w-full">
            <div className="flex gap-2">
                <div className="text-2xl font-semibold pb-4">Profile details</div>
            </div>
            <div className="py-4 border-t">
                <ProfileContent />
                <hr className="my-4" />
                <EmailAddress />
                <hr className="my-4" />
                <ConnectedAccounts />
            </div>
        </div>
    )
}

export default Profile;