"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { useUser, useClerk } from "@clerk/nextjs";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Home,
  Layers3,
  LockIcon,
  Search,
  Settings,
  ShieldAlert,
  User as UserIcon,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

// Mock projects data (replace this with your actual data fetching logic)
const mockProjects = [
  { id: 1, name: "Project Alpha" },
  { id: 2, name: "Project Beta" },
  { id: 3, name: "Project Gamma" },
];

const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
  const { user } = useUser();
  const { signOut } = useClerk();
  const imageUrl = user?.imageUrl;
  const username = user?.username;
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Set initial state based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        dispatch(setIsSidebarCollapsed(true)); // Collapse on small screens
      } else {
        dispatch(setIsSidebarCollapsed(false)); // Expand on large screens
      }
    };

    // Set initial state on mount
    handleResize();

    // Update state on window resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  // Close sidebar when clicking outside (only for small screens)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (window.innerWidth < 768) {
        if (
          sidebarRef.current &&
          !sidebarRef.current.contains(event.target as Node)
        ) {
          dispatch(setIsSidebarCollapsed(true)); // Collapse the sidebar
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  // Close sidebar when a link is clicked (only for small screens)
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      dispatch(setIsSidebarCollapsed(true)); // Collapse the sidebar
    }
  };

  if (!user) return null;

  const sidebarClassNames = `fixed flex flex-col h-screen justify-between shadow-xl transition-all duration-300 z-40 dark:bg-black overflow-y-auto bg-white ${
    isSidebarCollapsed ? "w-0 hidden" : "w-64"
  }`;

  return (
    <div className={sidebarClassNames} ref={sidebarRef}>
      <div className="flex h-[100%] w-full flex-col justify-start">
        {/* TOP LOGO */}
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-extrabold text-gray-800 dark:text-white">
            MANAGEMENT
          </div>
          {isSidebarCollapsed ? null : (
            <button
              className="py-3"
              onClick={() => {
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
              }}
            >
              <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
            </button>
          )}
        </div>
        {/* TEAM */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <Image
            src="/logo1.png"
            alt="Logo"
            width={40}
            height={40}
          />
          <div>
            <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
              BARREST TEAM
            </h3>
            <div className="mt-1 flex items-start gap-2 font-semibold">
              <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </div>
        {/* NAVBAR LINKS */}
        <nav className="z-10 w-full">
          <SidebarLink icon={Home} label="Home" href="/" onClick={handleLinkClick} />
          <SidebarLink icon={Briefcase} label="Timeline" href="/timeline" onClick={handleLinkClick} />
          <SidebarLink icon={Search} label="Search" href="/search" onClick={handleLinkClick} />
          <SidebarLink icon={Settings} label="Settings" href="/settings" onClick={handleLinkClick} />
          <SidebarLink icon={UserIcon} label="Users" href="/users" onClick={handleLinkClick} />
          <SidebarLink icon={Users} label="Teams" href="/teams" onClick={handleLinkClick} />
        </nav>

        {/* PROJECTS LINKS */}
        <button
          onClick={() => setShowProjects((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Projects</span>
          {showProjects ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        {/* PROJECTS LIST */}
        {showProjects &&
          mockProjects?.map((project) => (
            <SidebarLink
              key={project.id}
              icon={Briefcase}
              label={project.name}
              href={`/projects/${project.id}`}
              onClick={handleLinkClick}
            />
          ))}

        {/* PRIORITIES LINKS */}
        <button
          onClick={() => setShowPriority((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Priority</span>
          {showPriority ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        {showPriority && (
          <>
            <SidebarLink
              icon={AlertCircle}
              label="Urgent"
              href="/priority/urgent"
              onClick={handleLinkClick}
            />
            <SidebarLink
              icon={ShieldAlert}
              label="High"
              href="/priority/high"
              onClick={handleLinkClick}
            />
            <SidebarLink
              icon={AlertTriangle}
              label="Medium"
              href="/priority/medium"
              onClick={handleLinkClick}
            />
            <SidebarLink
              icon={AlertOctagon}
              label="Low"
              href="/priority/low"
              onClick={handleLinkClick}
            />
            <SidebarLink
              icon={Layers3}
              label="Backlog"
              href="/priority/backlog"
              onClick={handleLinkClick}
            />
          </>
        )}
      </div>
      <div className="mt-32 flex w-full items-center gap-4 bg-white px-8 py-4 mb-3 dark:bg-black md:hidden">
        <div className="flex w-full items-center">
          <div className="align-center flex h-9 w-9 justify-center">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={username || "User Profile Picture"}
                width={100}
                height={50}
                className="h-full rounded-full object-cover"
              />
            ) : (
              <UserIcon className="h-6 w-6 cursor-pointer self-center rounded-full dark:text-white" />
            )}
          </div>
          <span className="mx-3 text-gray-800 dark:text-white font-semibold">
            {username || "User"}
          </span>
          <button
            className="self-start rounded-lg bg-blue-500 px-4 py-2 text-xs font-bold text-white hover:bg-blue-400 md:block"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}

const SidebarLink = ({ href, icon: Icon, label, onClick }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${
          isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""
        } justify-start px-8 py-3`}
        onClick={onClick}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200" />
        )}

        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
        <span className={`font-medium text-gray-800 dark:text-gray-100`}>
          {label}
        </span>
      </div>
    </Link>
  );
};

export default Sidebar;