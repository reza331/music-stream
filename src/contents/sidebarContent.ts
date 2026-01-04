import { AiOutlineHistory } from "react-icons/ai";
import { CgPlayList } from "react-icons/cg";
import { HiBookmark } from "react-icons/hi";
import { IoMdMusicalNote } from "react-icons/io";
import { MdDashboard, MdQueueMusic } from "react-icons/md";

export type SingleItemType = {
    type: "single-item";
    text: string;
    href: string;
    icon: React.ElementType;
    onlylogin?:boolean
};

export type DropDownType = {
    type: "dropdown";
    text: string;
    icon: React.ElementType;
    options: SingleItemType[];
};

type Fields = {
    title: string;
    items: (SingleItemType | DropDownType)[];
};

const sideBarContent: Fields[] = [
    {
        title: "",
        items: [
            {
                type: "single-item",
                href: "/",
                text: "Home",
                icon: MdDashboard,
            },
            {
                type: "single-item",
                href: "/tracks",
                text: "Tracks",
                icon: IoMdMusicalNote,
            },
            {
                type: "single-item",
                href: "/playlists",
                text: "Playlists",
                icon: CgPlayList,
            },
            {
                type: "single-item",
                href: "/genres",
                text: "Genres",
                icon: MdQueueMusic,
            },
            {
                type: "single-item",
                href: "/saved",
                text: "Saved",
                icon: HiBookmark,
                onlylogin:true,
            },
            // for future :))
            // {
            //     type: "single-item",
            //     href: "#",
            //     text: "History",
            //     icon: AiOutlineHistory,
            // },
        ],
    },
];

export default sideBarContent;
