"use client"

interface Props {
    user: {
        id: string | undefined;
        objectId: string ;
        username: string ;
        name: string;
        bio: string;
        image: string | undefined;

    },
    btnTitle: string
}
export default function AccountProfile({user, btnTitle}: Props) {
  return (
    <div>AccountProfile</div>
  )
}
