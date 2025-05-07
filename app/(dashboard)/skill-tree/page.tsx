"use client"

import { useState, useEffect } from "react"
import { SkillPath } from "@/components/skill-tree/skill-path"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CareerPathFAQ } from "@/components/skill-tree/career-path-faq"
import { CareerPathRating } from "@/components/skill-tree/career-path-rating"

// Career path ratings data (in a real app, this would come from a database)
const pathRatings = {
  "women-returning": { rating: 92, votes: 124 },
  "rural-digital-freelancer": { rating: 88, votes: 97 },
  "social-healthcare": { rating: 90, votes: 76 },
  "indie-game-developer": { rating: 94, votes: 156 },
  "neurodivergent-strategist": { rating: 89, votes: 82 },
}

// Replace the skillPaths array with the new career paths
const skillPaths = [
  {
    id: "women-returning",
    title: "Women Returning to Work After a Career Break",
    shortTitle: "Career Restart",
    description: "A guided path for women restarting careers after extended maternity/family/personal leave.",
    keywords: ["women", "career break", "return to work", "maternity", "career change", "returnship"],
    skills: [
      {
        id: "reflect-goals",
        title: "Reflect on Goals & Direction",
        description: "Re-evaluate your interests, values, and lifestyle needs to determine your career direction.",
        status: "available" as const,
        x: 150,
        y: 100,
        mentorTips: [
          {
            name: "Divya Ahuja",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Take time to journal about what you enjoyed in your previous roles and what you'd like to change.",
            linkedin: "https://www.linkedin.com/pulse/my-story-returning-work-after-career-break-divya-ahuja/",
            email: "divya.ahuja@example.com",
          },
          {
            name: "Mansi Bakshi",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Consider how your priorities and values may have shifted during your career break.",
            linkedin: "https://www.linkedin.com/in/mansibakshi/",
            email: "mansi.bakshi@example.com",
          },
        ],
        resources: [
          {
            title: "Career Values Assessment",
            url: "#",
          },
          {
            title: "Returning to Work Planner",
            url: "#",
          },
        ],
      },
      {
        id: "same-field",
        title: "Same Field Upgrade",
        description: "Take refresher courses and understand new tools to update your skills in your previous field.",
        status: "locked" as const,
        x: 100,
        y: 250,
        mentorTips: [
          {
            name: "Lakshmi Srinivasan",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Research the latest tools and technologies in your field that emerged during your break.",
            linkedin: "https://www.linkedin.com/in/lakshmisrinivasan/",
            email: "lakshmi.srinivasan@example.com",
          },
          {
            name: "Divya Ahuja",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Connect with former colleagues to understand how the industry has evolved.",
            linkedin: "https://www.linkedin.com/pulse/my-story-returning-work-after-career-break-divya-ahuja/",
            email: "divya.ahuja@example.com",
          },
        ],
        resources: [
          {
            title: "Industry Update Webinars",
            url: "#",
          },
          {
            title: "LinkedIn Learning Refresher Courses",
            url: "#",
            isCertification: true,
          },
        ],
      },
      {
        id: "new-career",
        title: "Career Transition Specialist",
        description: "Enroll in foundational training or bootcamps to prepare for a career change.",
        status: "locked" as const,
        x: 300,
        y: 250,
        hasCertification: true,
        mentorTips: [
          {
            name: "Mansi Bakshi",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Look for bootcamps with flexible schedules designed for career changers.",
            linkedin: "https://www.linkedin.com/in/mansibakshi/",
            email: "mansi.bakshi@example.com",
          },
          {
            name: "Lakshmi Srinivasan",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Start with free online courses to test your interest before committing to paid programs.",
            linkedin: "https://www.linkedin.com/in/lakshmisrinivasan/",
            email: "lakshmi.srinivasan@example.com",
          },
        ],
        resources: [
          {
            title: "Career Change Roadmap",
            url: "#",
          },
          {
            title: "Google Rework Your Career Certification",
            url: "https://www.coursera.org/learn/rework-your-career",
            isCertification: true,
          },
        ],
      },
      {
        id: "digital-presence",
        title: "Update Digital Presence",
        description: "Refresh your LinkedIn and résumé, tailoring them for your new role or direction.",
        status: "locked" as const,
        x: 200,
        y: 400,
        mentorTips: [
          {
            name: "Divya Ahuja",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Address your career gap honestly but focus on skills gained during that time.",
            linkedin: "https://www.linkedin.com/pulse/my-story-returning-work-after-career-break-divya-ahuja/",
            email: "divya.ahuja@example.com",
          },
          {
            name: "Mansi Bakshi",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Update your profile photo and headline to reflect your current professional identity.",
            linkedin: "https://www.linkedin.com/in/mansibakshi/",
            email: "mansi.bakshi@example.com",
          },
        ],
        resources: [
          {
            title: "LinkedIn Profile Optimization Guide",
            url: "#",
          },
          {
            title: "Resume Templates for Career Returners",
            url: "#",
          },
        ],
      },
      {
        id: "rebuild-network",
        title: "Rebuild Network",
        description: "Reconnect with former colleagues and join returnship groups to expand your professional network.",
        status: "locked" as const,
        x: 400,
        y: 400,
        mentorTips: [
          {
            name: "Lakshmi Srinivasan",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Schedule virtual coffee chats with former colleagues to reestablish connections.",
            linkedin: "https://www.linkedin.com/in/lakshmisrinivasan/",
            email: "lakshmi.srinivasan@example.com",
          },
          {
            name: "Divya Ahuja",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Join industry-specific groups for returners on LinkedIn and Facebook.",
            linkedin: "https://www.linkedin.com/pulse/my-story-returning-work-after-career-break-divya-ahuja/",
            email: "divya.ahuja@example.com",
          },
        ],
        resources: [
          {
            title: "Networking Scripts for Returners",
            url: "#",
          },
          {
            title: "Women Returners Network",
            url: "#",
          },
        ],
      },
      {
        id: "apply-upskill",
        title: "Apply & Upskill Simultaneously",
        description:
          "Look for returnships, part-time roles, or flexible internships while continuing to develop skills.",
        status: "locked" as const,
        x: 300,
        y: 550,
        mentorTips: [
          {
            name: "Mansi Bakshi",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Target companies with formal returnship programs that understand career gaps.",
            linkedin: "https://www.linkedin.com/in/mansibakshi/",
            email: "mansi.bakshi@example.com",
          },
          {
            name: "Lakshmi Srinivasan",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Consider project-based work to build recent experience for your resume.",
            linkedin: "https://www.linkedin.com/in/lakshmisrinivasan/",
            email: "lakshmi.srinivasan@example.com",
          },
        ],
        resources: [
          {
            title: "The Mom Project",
            url: "https://themomproject.com/",
          },
          {
            title: "iRelaunch",
            url: "https://www.irelaunch.com/",
          },
        ],
      },
    ],
    connections: [
      { from: "reflect-goals", to: "same-field" },
      { from: "reflect-goals", to: "new-career" },
      { from: "same-field", to: "digital-presence" },
      { from: "new-career", to: "digital-presence" },
      { from: "digital-presence", to: "rebuild-network" },
      { from: "rebuild-network", to: "apply-upskill" },
      { from: "digital-presence", to: "apply-upskill" },
    ],
    faqs: [
      {
        question: "How do I explain my career gap in interviews?",
        answer:
          "Be honest but strategic. Briefly acknowledge the gap and reason, then pivot to skills gained during that time (organization, adaptability, etc.) and your enthusiasm to return. Practice your response to sound confident.",
      },
      {
        question: "Is it better to return to my previous field or change careers?",
        answer:
          "This depends on your interests, how much your field has changed, and your financial/time constraints. Returning to your previous field typically requires less retraining, while a career change offers a fresh start but may take longer to establish.",
      },
      {
        question: "What are returnships and how do I find them?",
        answer:
          "Returnships are internship-like programs specifically designed for professionals returning after a career break. Companies like Amazon, IBM, and Goldman Sachs offer them. Search for 'returnship programs' or check platforms like iRelaunch and The Mom Project.",
      },
      {
        question: "How do I update my skills after being away from the workforce?",
        answer:
          "Start with online courses on platforms like Coursera, LinkedIn Learning, or industry-specific certifications. Join professional groups to learn current trends, and consider volunteering or project work to apply these skills practically.",
      },
      {
        question: "How long will it take to successfully return to work?",
        answer:
          "The timeline varies greatly depending on your field, the length of your break, and current market conditions. Most returners find suitable roles within 3-6 months of dedicated effort, but it can take longer for career changers or highly specialized fields.",
      },
    ],
  },
  {
    id: "rural-digital-freelancer",
    title: "Rural Digital Freelancer",
    shortTitle: "Digital Freelancer",
    description: "A career path for individuals from remote/rural areas seeking location-independent digital careers.",
    keywords: ["rural", "remote", "freelance", "digital", "online", "location-independent"],
    skills: [
      {
        id: "assess-connectivity",
        title: "Assess Connectivity & Devices",
        description: "Ensure basic tech access and explore local digital hubs or community centers with internet.",
        status: "available" as const,
        x: 150,
        y: 100,
        mentorTips: [
          {
            name: "Shubham Singhal",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Identify backup internet options like mobile hotspots or nearby cafes for when your primary connection fails.",
            linkedin: "https://www.linkedin.com/in/shubham-singhal1/",
            email: "shubham.singhal@example.com",
          },
          {
            name: "Kusum Lata",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Even a basic smartphone can be enough to start - many successful freelancers began with just that.",
            linkedin: "https://www.linkedin.com/in/kusumlata007/",
            email: "kusum.lata@example.com",
          },
        ],
        resources: [
          {
            title: "Rural Internet Options Guide",
            url: "#",
          },
          {
            title: "Low-Cost Device Programs",
            url: "#",
          },
        ],
      },
      {
        id: "skill-acquisition",
        title: "Skill Acquisition",
        description: "Learn high-demand digital services like design, writing, web development, or virtual assistance.",
        status: "locked" as const,
        x: 300,
        y: 200,
        hasCertification: true,
        mentorTips: [
          {
            name: "Sagar More",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Focus on one skill to master rather than trying to learn multiple skills simultaneously.",
            linkedin: "https://www.linkedin.com/in/sagarmore/",
            email: "sagar.more@example.com",
          },
          {
            name: "Shubham Singhal",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Download tutorials when you have good internet to study offline during connectivity issues.",
            linkedin: "https://www.linkedin.com/in/shubham-singhal1/",
            email: "shubham.singhal@example.com",
          },
        ],
        resources: [
          {
            title: "Google Digital Marketing Certification",
            url: "https://learndigital.withgoogle.com/digitalgarage/course/digital-marketing",
            isCertification: true,
          },
          {
            title: "Free Code Camp Responsive Web Design Certification",
            url: "https://www.freecodecamp.org/",
            isCertification: true,
          },
        ],
      },
      {
        id: "online-presence",
        title: "Build Online Presence",
        description:
          "Create a portfolio on platforms like Behance or GitHub, and establish a professional LinkedIn profile.",
        status: "locked" as const,
        x: 450,
        y: 300,
        mentorTips: [
          {
            name: "Kusum Lata",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Your portfolio should highlight problems you solved, not just what you created.",
            linkedin: "https://www.linkedin.com/in/kusumlata007/",
            email: "kusum.lata@example.com",
          },
          {
            name: "Sagar More",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Include your rural location as a unique selling point - many clients value diverse perspectives.",
            linkedin: "https://www.linkedin.com/in/sagarmore/",
            email: "sagar.more@example.com",
          },
        ],
        resources: [
          {
            title: "Portfolio Building Guide",
            url: "#",
          },
          {
            title: "LinkedIn Profile Optimization",
            url: "#",
          },
        ],
      },
      {
        id: "freelance-platforms",
        title: "Freelance Platforms",
        description: "Create profiles on platforms like Fiverr, Upwork, or Toptal to find freelance opportunities.",
        status: "locked" as const,
        x: 300,
        y: 400,
        mentorTips: [
          {
            name: "Shubham Singhal",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Start with smaller projects to build reviews before bidding on larger contracts.",
            linkedin: "https://www.linkedin.com/in/shubham-singhal1/",
            email: "shubham.singhal@example.com",
          },
          {
            name: "Kusum Lata",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Specialize in a niche to stand out from the competition on crowded platforms.",
            linkedin: "https://www.linkedin.com/in/kusumlata007/",
            email: "kusum.lata@example.com",
          },
        ],
        resources: [
          {
            title: "Fiverr Learn – Freelance 101 Certification",
            url: "https://learn.fiverr.com/courses/freelance-101",
            isCertification: true,
          },
          {
            title: "Upwork Profile Optimization Guide",
            url: "#",
          },
        ],
      },
      {
        id: "remote-jobs",
        title: "Remote Jobs",
        description: "Apply to global remote companies for more stable, long-term employment opportunities.",
        status: "locked" as const,
        x: 600,
        y: 400,
        mentorTips: [
          {
            name: "Sagar More",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Research companies that are fully remote, not just those offering temporary remote work.",
            linkedin: "https://www.linkedin.com/in/sagarmore/",
            email: "sagar.more@example.com",
          },
          {
            name: "Shubham Singhal",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Prepare for video interviews by testing your setup and practicing with friends.",
            linkedin: "https://www.linkedin.com/in/shubham-singhal1/",
            email: "shubham.singhal@example.com",
          },
        ],
        resources: [
          {
            title: "Remote OK Job Board",
            url: "#",
          },
          {
            title: "We Work Remotely",
            url: "#",
          },
        ],
      },
      {
        id: "financial-management",
        title: "Financial & Time Management",
        description: "Learn pricing strategies, contract negotiation, basic accounting, and effective time management.",
        status: "locked" as const,
        x: 450,
        y: 550,
        mentorTips: [
          {
            name: "Kusum Lata",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Set up separate accounts for business and personal finances from the beginning.",
            linkedin: "https://www.linkedin.com/in/kusumlata007/",
            email: "kusum.lata@example.com",
          },
          {
            name: "Sagar More",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Track your productive hours and schedule client work during your peak performance times.",
            linkedin: "https://www.linkedin.com/in/sagarmore/",
            email: "sagar.more@example.com",
          },
        ],
        resources: [
          {
            title: "Freelance Financial Planning",
            url: "#",
          },
          {
            title: "Time Tracking & Productivity Tools",
            url: "#",
          },
        ],
      },
    ],
    connections: [
      { from: "assess-connectivity", to: "skill-acquisition" },
      { from: "skill-acquisition", to: "online-presence" },
      { from: "online-presence", to: "freelance-platforms" },
      { from: "online-presence", to: "remote-jobs" },
      { from: "freelance-platforms", to: "financial-management" },
      { from: "remote-jobs", to: "financial-management" },
    ],
    faqs: [
      {
        question: "How can I work online with unreliable internet?",
        answer:
          "Plan around connectivity issues: download work to complete offline, use mobile data as backup, schedule uploads/meetings during reliable connection times, and communicate openly with clients about your situation. Consider weekly trips to locations with better connectivity for high-bandwidth tasks.",
      },
      {
        question: "What digital skills are most in-demand for remote work?",
        answer:
          "Currently, web development, digital marketing, content writing, graphic design, and virtual assistance are highly sought after. Data analysis, social media management, and e-commerce management are also growing fields that can be done remotely with minimal equipment.",
      },
      {
        question: "How do I price my services as a beginner?",
        answer:
          "Research market rates for your skill level and location, then start slightly lower to build reviews. Gradually increase rates as you gain experience. Consider value-based pricing for projects where your work directly generates revenue for clients. Always factor in all costs, including internet and equipment.",
      },
      {
        question: "How do I handle payments from international clients?",
        answer:
          "Popular options include PayPal, Wise (formerly TransferWise), and Payoneer. Research which platforms have the lowest fees and best exchange rates for your country. Some freelance platforms handle payments for you but charge a commission. Always clarify payment terms before starting work.",
      },
      {
        question: "How can I build trust with clients I never meet in person?",
        answer:
          "Maintain clear, prompt communication, deliver work on time, and be transparent about challenges. Use video calls when possible, provide regular updates, and ask for feedback. Building a portfolio of testimonials and reviews is crucial for establishing credibility in remote work.",
      },
    ],
  },
  {
    id: "social-healthcare",
    title: "Clinician to Social Healthcare Worker",
    shortTitle: "Social Healthcare",
    description:
      "A transition path for medical professionals shifting from clinical/private roles to global/public/social healthcare.",
    keywords: ["healthcare", "social", "global health", "public health", "medical", "community"],
    skills: [
      {
        id: "understand-social",
        title: "Understand Social Determinants",
        description: "Learn the landscape of community-focused care and social factors affecting health outcomes.",
        status: "available" as const,
        x: 150,
        y: 100,
        mentorTips: [
          {
            name: "Dr. Farhana Sultana",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Shadow community health workers to understand grassroots healthcare challenges.",
            linkedin: "https://www.linkedin.com/in/farhana-sultana-27044018/",
            email: "farhana.sultana@example.com",
          },
          {
            name: "Dr. Manoj Mohanan",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Read case studies from different regions to understand how social factors vary by context.",
            linkedin: "https://www.linkedin.com/in/manoj-mohanan-2211327/",
            email: "manoj.mohanan@example.com",
          },
        ],
        resources: [
          {
            title: "Social Determinants of Health: WHO Guide",
            url: "#",
          },
          {
            title: "Community Health Assessment Toolkit",
            url: "#",
          },
        ],
      },
      {
        id: "skill-upgrade",
        title: "Skill Upgrade",
        description:
          "Develop expertise in global health, public policy, cultural competency, and community engagement.",
        status: "locked" as const,
        x: 300,
        y: 200,
        hasCertification: true,
        mentorTips: [
          {
            name: "Dr. Catherine Kyobutungi",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Learn at least the basics of epidemiology and biostatistics to understand population health.",
            linkedin: "https://www.linkedin.com/in/catherinekyobutungi/",
            email: "catherine.kyobutungi@example.com",
          },
          {
            name: "Dr. Farhana Sultana",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Develop cultural humility - the ability to recognize limitations in your cultural understanding.",
            linkedin: "https://www.linkedin.com/in/farhana-sultana-27044018/",
            email: "farhana.sultana@example.com",
          },
        ],
        resources: [
          {
            title: "Harvard Global Health Delivery Certification",
            url: "https://onlinelearning.harvard.edu/course/global-health-delivery",
            isCertification: true,
          },
          {
            title: "Cultural Competency in Healthcare Certification",
            url: "#",
            isCertification: true,
          },
        ],
      },
      {
        id: "global-orgs",
        title: "NGOs / Global Orgs",
        description: "Prepare for roles with organizations like WHO, Doctors Without Borders, or local NGOs.",
        status: "locked" as const,
        x: 200,
        y: 350,
        mentorTips: [
          {
            name: "Dr. Manoj Mohanan",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Volunteer with local chapters of international organizations to build relevant experience.",
            linkedin: "https://www.linkedin.com/in/manoj-mohanan-2211327/",
            email: "manoj.mohanan@example.com",
          },
          {
            name: "Dr. Catherine Kyobutungi",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Learn about grant writing and program evaluation - crucial skills for NGO work.",
            linkedin: "https://www.linkedin.com/in/catherinekyobutungi/",
            email: "catherine.kyobutungi@example.com",
          },
        ],
        resources: [
          {
            title: "WHO OpenWHO Certification Courses",
            url: "https://openwho.org/",
            isCertification: true,
          },
          {
            title: "NGO Career Resources",
            url: "#",
          },
        ],
      },
      {
        id: "policy-research",
        title: "Policy & Research",
        description: "Focus on academic or public health institutions to influence healthcare policy and research.",
        status: "locked" as const,
        x: 400,
        y: 350,
        mentorTips: [
          {
            name: "Dr. Farhana Sultana",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Develop strong research methodology skills and learn to communicate findings to non-experts.",
            linkedin: "https://www.linkedin.com/in/farhana-sultana-27044018/",
            email: "farhana.sultana@example.com",
          },
          {
            name: "Dr. Manoj Mohanan",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Identify a specific policy area where your clinical expertise adds unique value.",
            linkedin: "https://www.linkedin.com/in/manoj-mohanan-2211327/",
            email: "manoj.mohanan@example.com",
          },
        ],
        resources: [
          {
            title: "Health Policy Research Methods",
            url: "#",
          },
          {
            title: "Academic Publishing Guide",
            url: "#",
          },
        ],
      },
      {
        id: "fieldwork",
        title: "Fieldwork / Fellowship",
        description: "Participate in short-term missions or fellowships to gain hands-on experience in global health.",
        status: "locked" as const,
        x: 300,
        y: 500,
        mentorTips: [
          {
            name: "Dr. Catherine Kyobutungi",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Prepare for resource constraints by practicing minimalist approaches to care.",
            linkedin: "https://www.linkedin.com/in/catherinekyobutungi/",
            email: "catherine.kyobutungi@example.com",
          },
          {
            name: "Dr. Farhana Sultana",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Document your experiences thoroughly - they'll be valuable for future applications and learning.",
            linkedin: "https://www.linkedin.com/in/farhana-sultana-27044018/",
            email: "farhana.sultana@example.com",
          },
        ],
        resources: [
          {
            title: "Global Health Fellowship Directory",
            url: "#",
          },
          {
            title: "Field Medicine Preparation Guide",
            url: "#",
          },
        ],
      },
      {
        id: "community-advocacy",
        title: "Community Advocacy & Capacity Building",
        description: "Train locals, contribute to sustainable care systems, and advocate for community health needs.",
        status: "locked" as const,
        x: 300,
        y: 650,
        mentorTips: [
          {
            name: "Dr. Manoj Mohanan",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Focus on training trainers to create a multiplier effect in your impact.",
            linkedin: "https://www.linkedin.com/in/manoj-mohanan-2211327/",
            email: "manoj.mohanan@example.com",
          },
          {
            name: "Dr. Catherine Kyobutungi",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Learn to measure outcomes that matter to communities, not just clinical metrics.",
            linkedin: "https://www.linkedin.com/in/catherinekyobutungi/",
            email: "catherine.kyobutungi@example.com",
          },
        ],
        resources: [
          {
            title: "Community Health Worker Training Manual",
            url: "#",
          },
          {
            title: "Advocacy Toolkit for Health Professionals",
            url: "#",
          },
        ],
      },
    ],
    connections: [
      { from: "understand-social", to: "skill-upgrade" },
      { from: "skill-upgrade", to: "global-orgs" },
      { from: "skill-upgrade", to: "policy-research" },
      { from: "global-orgs", to: "fieldwork" },
      { from: "policy-research", to: "fieldwork" },
      { from: "fieldwork", to: "community-advocacy" },
    ],
    faqs: [
      {
        question: "How do I transition from clinical practice to global health?",
        answer:
          "Start by gaining relevant experience through volunteering with local community health initiatives or global health organizations. Take courses in public health, epidemiology, or global health policy. Network with professionals already in the field, and consider a Master's in Public Health (MPH) or similar qualification if possible.",
      },
      {
        question: "What skills from clinical practice transfer well to social healthcare?",
        answer:
          "Clinical assessment skills, patient communication, diagnostic reasoning, and treatment planning all transfer well. Your medical knowledge provides credibility, while your experience with patient care helps you understand health needs at an individual level. These skills need to be adapted to community contexts and resource-limited settings.",
      },
      {
        question: "Do I need additional certifications or degrees?",
        answer:
          "While not always required, a Master's in Public Health (MPH), Global Health, or related field can be valuable. Certificates in specific areas like Tropical Medicine, Humanitarian Response, or Health Systems Management can also enhance your qualifications. Many organizations value field experience equally or more than formal credentials.",
      },
      {
        question: "How can I find fieldwork opportunities?",
        answer:
          "Organizations like Doctors Without Borders, Partners in Health, and the WHO offer field positions. Look for short-term medical missions through faith-based organizations, disaster response teams, or refugee health programs. University global health departments often have connections to field opportunities for professionals.",
      },
      {
        question: "What are the biggest challenges in transitioning to social healthcare?",
        answer:
          "Common challenges include adapting to resource constraints, shifting from individual to population-based thinking, cultural and language barriers, and potentially lower compensation than clinical roles. The work can also involve difficult living conditions, separation from family, and exposure to health and safety risks. However, many find the meaningful impact and diverse experiences worth these challenges.",
      },
    ],
  },
  {
    id: "indie-game-developer",
    title: "Indie Game Developer",
    shortTitle: "Game Developer",
    description: "A path for self-driven creatives from underrepresented groups building games independently.",
    keywords: ["game", "developer", "indie", "creative", "programming", "design", "narrative"],
    skills: [
      {
        id: "learn-fundamentals",
        title: "Learn the Fundamentals",
        description: "Master game engines like Unity or Unreal, basic scripting, and level design principles.",
        status: "available" as const,
        x: 150,
        y: 100,
        hasCertification: true,
        mentorTips: [
          {
            name: "Cornelia Geppert",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Start with small, achievable projects to build confidence and maintain motivation.",
            linkedin: "https://www.linkedin.com/in/corneliageppert/",
            email: "cornelia.geppert@example.com",
          },
          {
            name: "Rami Ismail",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Choose one engine and stick with it until you're comfortable before exploring others.",
            linkedin: "https://www.linkedin.com/in/ramiismail/",
            email: "rami.ismail@example.com",
          },
        ],
        resources: [
          {
            title: "Unity Certified User: Programmer Certification",
            url: "https://www.coursera.org/learn/unity-certified-programmer",
            isCertification: true,
          },
          {
            title: "Brackeys YouTube Tutorials",
            url: "https://www.youtube.com/user/Brackeys",
          },
        ],
      },
      {
        id: "build-prototypes",
        title: "Build & Test Prototypes",
        description: "Create small games to develop technical and creative skills, focusing on rapid iteration.",
        status: "locked" as const,
        x: 300,
        y: 200,
        mentorTips: [
          {
            name: "Rebecca Fernández",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Focus on one core gameplay mechanic and polish it before adding more features.",
            linkedin: "https://www.linkedin.com/in/rebeccapurple/",
            email: "rebecca.fernandez@example.com",
          },
          {
            name: "Cornelia Geppert",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Get feedback early and often, even on rough prototypes - it will save you time later.",
            linkedin: "https://www.linkedin.com/in/corneliageppert/",
            email: "cornelia.geppert@example.com",
          },
        ],
        resources: [
          {
            title: "Game Prototyping Techniques",
            url: "#",
          },
          {
            title: "User Testing for Game Developers",
            url: "#",
          },
        ],
      },
      {
        id: "developer-role",
        title: "Developer/Programmer",
        description: "Specialize in coding gameplay mechanics, systems, and technical aspects of game development.",
        status: "locked" as const,
        x: 150,
        y: 350,
        mentorTips: [
          {
            name: "Rami Ismail",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Learn to write clean, maintainable code early - technical debt is especially painful in games.",
            linkedin: "https://www.linkedin.com/in/ramiismail/",
            email: "rami.ismail@example.com",
          },
          {
            name: "Rebecca Fernández",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Build a library of reusable code components to speed up future development.",
            linkedin: "https://www.linkedin.com/in/rebeccapurple/",
            email: "rebecca.fernandez@example.com",
          },
        ],
        resources: [
          {
            title: "Game Programming Patterns",
            url: "#",
          },
          {
            title: "Advanced Unity Scripting Certification",
            url: "#",
            isCertification: true,
          },
        ],
      },
      {
        id: "artist-role",
        title: "Artist/Designer",
        description: "Focus on visual aspects including character design, environments, UI, and overall aesthetic.",
        status: "locked" as const,
        x: 300,
        y: 350,
        mentorTips: [
          {
            name: "Cornelia Geppert",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Develop a distinctive art style that stands out and can be executed efficiently.",
            linkedin: "https://www.linkedin.com/in/corneliageppert/",
            email: "cornelia.geppert@example.com",
          },
          {
            name: "Rebecca Fernández",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Learn to balance artistic vision with technical constraints and performance requirements.",
            linkedin: "https://www.linkedin.com/in/rebeccapurple/",
            email: "rebecca.fernandez@example.com",
          },
        ],
        resources: [
          {
            title: "Digital Art Fundamentals for Games",
            url: "#",
          },
          {
            title: "Game UI Design Principles",
            url: "#",
          },
        ],
      },
      {
        id: "writer-role",
        title: "Writer/Narrative Designer",
        description: "Develop game stories, dialogue, character arcs, and integrate narrative with gameplay.",
        status: "locked" as const,
        x: 450,
        y: 350,
        mentorTips: [
          {
            name: "Rebecca Fernández",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Study interactive storytelling specifically - it's very different from linear media.",
            linkedin: "https://www.linkedin.com/in/rebeccapurple/",
            email: "rebecca.fernandez@example.com",
          },
          {
            name: "Cornelia Geppert",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Create narrative that enhances gameplay rather than interrupting it.",
            linkedin: "https://www.linkedin.com/in/corneliageppert/",
            email: "cornelia.geppert@example.com",
          },
        ],
        resources: [
          {
            title: "Interactive Storytelling Techniques",
            url: "#",
          },
          {
            title: "Character Development for Games",
            url: "#",
          },
        ],
      },
      {
        id: "publish-indie",
        title: "Publish on Indie Platforms",
        description: "Release your games on platforms like Itch.io, Steam, or participate in game jams.",
        status: "locked" as const,
        x: 300,
        y: 500,
        mentorTips: [
          {
            name: "Rami Ismail",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Don't wait for perfection - releasing early helps you learn from real player feedback.",
            linkedin: "https://www.linkedin.com/in/ramiismail/",
            email: "rami.ismail@example.com",
          },
          {
            name: "Rebecca Fernández",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Game jams are excellent for building your portfolio and connecting with other developers.",
            linkedin: "https://www.linkedin.com/in/rebeccapurple/",
            email: "rebecca.fernandez@example.com",
          },
        ],
        resources: [
          {
            title: "Itch.io Publishing Guide",
            url: "#",
          },
          {
            title: "Steam Direct Submission Process",
            url: "#",
          },
        ],
      },
      {
        id: "grow-community",
        title: "Grow Community & Crowdfund",
        description: "Build a following on social media and explore funding through Patreon, Kickstarter, or grants.",
        status: "locked" as const,
        x: 300,
        y: 650,
        mentorTips: [
          {
            name: "Cornelia Geppert",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Share your development process openly - players love to see behind the scenes.",
            linkedin: "https://www.linkedin.com/in/corneliageppert/",
            email: "cornelia.geppert@example.com",
          },
          {
            name: "Rami Ismail",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Build your community before you need funding - successful crowdfunding requires an audience.",
            linkedin: "https://www.linkedin.com/in/ramiismail/",
            email: "rami.ismail@example.com",
          },
        ],
        resources: [
          {
            title: "Indie Game Marketing Guide",
            url: "#",
          },
          {
            title: "Crowdfunding Campaign Planning",
            url: "#",
          },
        ],
      },
    ],
    connections: [
      { from: "learn-fundamentals", to: "build-prototypes" },
      { from: "build-prototypes", to: "developer-role" },
      { from: "build-prototypes", to: "artist-role" },
      { from: "build-prototypes", to: "writer-role" },
      { from: "developer-role", to: "publish-indie" },
      { from: "artist-role", to: "publish-indie" },
      { from: "writer-role", to: "publish-indie" },
      { from: "publish-indie", to: "grow-community" },
    ],
    faqs: [
      {
        question: "Do I need to know how to code to make games?",
        answer:
          "Not necessarily. While coding knowledge is valuable, modern game engines like Unity and Unreal offer visual scripting options that require minimal coding. You can also focus on art, design, or narrative and collaborate with programmers. However, learning basic programming concepts will give you more creative control and independence.",
      },
      {
        question: "How much does it cost to start making indie games?",
        answer:
          "You can start with minimal investment. Free versions of Unity and Unreal Engine are available for beginners. Open-source tools like Godot, GIMP, and Blender cost nothing. Your main investment will be time for learning and development. As you progress, you might spend on assets, software subscriptions, or marketing, but many successful indies start with under $100 in tools.",
      },
      {
        question: "How long does it take to make a game?",
        answer:
          "Timeframes vary dramatically based on scope, experience, and team size. A simple game might take a few weeks, while more complex projects can take years. For beginners, it's best to start with games that can be completed in 1-3 months to build experience and avoid burnout. Game jams, which typically last 48-72 hours, are excellent practice for scope management.",
      },
      {
        question: "How do indie developers make money?",
        answer:
          "Revenue sources include direct sales on platforms like Steam or itch.io, in-app purchases, advertisements, crowdfunding (Kickstarter, Patreon), publisher advances, grants for underrepresented developers, and licensing your game or technology. Most successful indies diversify their income streams rather than relying on a single source.",
      },
      {
        question: "How can I stand out in a crowded indie market?",
        answer:
          "Develop a distinctive visual style, innovative gameplay mechanics, or compelling narrative that differentiates your game. Focus on underserved niches or bring your unique cultural perspective to your games. Build a community early by sharing your development process, and consider how your identity and experiences can inform games that tell stories others can't tell.",
      },
    ],
  },
  {
    id: "neurodivergent-strategist",
    title: "Neurodivergent Learning Strategist",
    shortTitle: "Learning Strategist",
    description:
      "A path for neurodivergent individuals designing inclusive learning experiences using their cognitive strengths.",
    keywords: ["neurodivergent", "learning", "education", "accessibility", "inclusion", "ADHD", "autism", "dyslexia"],
    skills: [
      {
        id: "understand-differences",
        title: "Understand Learning Differences",
        description: "Research ADHD, autism, dyslexia, and other neurodivergent learning needs and strengths.",
        status: "available" as const,
        x: 150,
        y: 100,
        mentorTips: [
          {
            name: "Kieran Rose",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Start by understanding your own neurodivergent traits and how they've shaped your learning journey.",
            linkedin: "https://www.linkedin.com/in/kieranroseautistic/",
            email: "kieran.rose@example.com",
          },
          {
            name: "Pooky Knightsmith",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Learn from autistic, ADHD, and dyslexic self-advocates rather than only clinical perspectives.",
            linkedin: "https://www.linkedin.com/in/pookyknightsmith/",
            email: "pooky.knightsmith@example.com",
          },
        ],
        resources: [
          {
            title: "Neurodiversity Hub Resources",
            url: "#",
          },
          {
            title: "ADHD, Autism, and Dyslexia Learning Profiles",
            url: "#",
          },
        ],
      },
      {
        id: "study-inclusive",
        title: "Study Inclusive Education Tools",
        description: "Learn Universal Design for Learning principles and assistive technology applications.",
        status: "locked" as const,
        x: 300,
        y: 200,
        mentorTips: [
          {
            name: "Jacquelyn Fede",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Experiment with different assistive technologies yourself to understand their benefits and limitations.",
            linkedin: "https://www.linkedin.com/in/jacquelynfede/",
            email: "jacquelyn.fede@example.com",
          },
          {
            name: "Kieran Rose",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Remember that accessibility needs can conflict - what helps one person might hinder another.",
            linkedin: "https://www.linkedin.com/in/kieranroseautistic/",
            email: "kieran.rose@example.com",
          },
        ],
        resources: [
          {
            title: "CAST.org – UDL Guidelines Certification",
            url: "https://www.cast.org/",
            isCertification: true,
          },
          {
            title: "Assistive Technology Evaluation Guide",
            url: "#",
          },
        ],
      },
      {
        id: "create-models",
        title: "Create Your Own Learning Models",
        description: "Develop lesson plans or platforms that support neurodivergent learners using your insights.",
        status: "locked" as const,
        x: 300,
        y: 350,
        mentorTips: [
          {
            name: "Pooky Knightsmith",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Start by adapting existing materials before creating from scratch - it's more efficient.",
            linkedin: "https://www.linkedin.com/in/pookyknightsmith/",
            email: "pooky.knightsmith@example.com",
          },
          {
            name: "Jacquelyn Fede",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Test your materials with diverse neurodivergent learners - what works for you may not work for all.",
            linkedin: "https://www.linkedin.com/in/jacquelynfede/",
            email: "jacquelyn.fede@example.com",
          },
        ],
        resources: [
          {
            title: "Inclusive Lesson Planning Templates",
            url: "#",
          },
          {
            title: "Neurodivergent-Friendly Content Creation",
            url: "#",
          },
        ],
      },
      {
        id: "certify-skills",
        title: "Certify Your Skills",
        description: "Get credentialed in inclusive teaching, educational technology, or special education.",
        status: "locked" as const,
        x: 300,
        y: 500,
        hasCertification: true,
        mentorTips: [
          {
            name: "Kieran Rose",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Look for programs that value lived experience alongside academic knowledge.",
            linkedin: "https://www.linkedin.com/in/kieranroseautistic/",
            email: "kieran.rose@example.com",
          },
          {
            name: "Pooky Knightsmith",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Choose certifications that include practical components, not just theory.",
            linkedin: "https://www.linkedin.com/in/pookyknightsmith/",
            email: "pooky.knightsmith@example.com",
          },
        ],
        resources: [
          {
            title: "Supporting Neurodivergent Students Certification",
            url: "https://www.futurelearn.com/courses/neurodiversity-in-education",
            isCertification: true,
          },
          {
            title: "Inclusive Education Certification Paths",
            url: "#",
            isCertification: true,
          },
        ],
      },
      {
        id: "join-organizations",
        title: "Join Schools, NGOs or Freelance",
        description: "Work as a learning strategist, designer, advocate, or trainer in various educational settings.",
        status: "locked" as const,
        x: 300,
        y: 650,
        mentorTips: [
          {
            name: "Jacquelyn Fede",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Position your neurodivergence as a professional asset that gives you unique insights.",
            linkedin: "https://www.linkedin.com/in/jacquelynfede/",
            email: "jacquelyn.fede@example.com",
          },
          {
            name: "Kieran Rose",
            avatar: "/placeholder.svg?height=40&width=40",
            tip: "Build a portfolio of adaptations and accommodations you've created to showcase your work.",
            linkedin: "https://www.linkedin.com/in/kieranroseautistic/",
            email: "kieran.rose@example.com",
          },
        ],
        resources: [
          {
            title: "Neurodiversity Employment Resources",
            url: "#",
          },
          {
            title: "Educational Consulting Startup Guide",
            url: "#",
          },
        ],
      },
    ],
    connections: [
      { from: "understand-differences", to: "study-inclusive" },
      { from: "study-inclusive", to: "create-models" },
      { from: "create-models", to: "certify-skills" },
      { from: "certify-skills", to: "join-organizations" },
    ],
    faqs: [
      {
        question: "Do I need to disclose my neurodivergence professionally?",
        answer:
          "Disclosure is a personal choice. Many learning strategists find that sharing their neurodivergence adds credibility and authenticity to their work, especially when supporting neurodivergent learners. However, you can choose when, how, and to whom you disclose. Some professionals disclose their diagnosis broadly, while others share only specific traits or challenges as relevant to their work.",
      },
      {
        question: "What qualifications do I need to become a learning strategist?",
        answer:
          "Requirements vary by setting. While formal education (degrees in education, psychology, or special education) can be valuable, many organizations now recognize the importance of lived experience. Certifications in Universal Design for Learning, assistive technology, or specific learning approaches can complement your personal insights. Building a portfolio of adapted materials and testimonials from those you've helped can be equally important.",
      },
      {
        question: "How can I manage my own neurodivergent traits while supporting others?",
        answer:
          "Self-awareness and accommodations are key. Identify your strengths (hyperfocus, pattern recognition, creative thinking) and challenges (executive function, sensory sensitivities). Create systems that support your needs - this might include scheduling breaks, using organizational tools, or partnering with someone with complementary strengths. Model self-advocacy by being open about your accommodations when appropriate.",
      },
      {
        question: "Where can I find work as a neurodivergent learning strategist?",
        answer:
          "Options include schools (as specialists or consultants), educational technology companies, disability support services in higher education, workforce development programs, and independent consulting. Organizations specifically serving neurodivergent populations often value lived experience. Consider starting with freelance projects or volunteering to build your portfolio and references.",
      },
      {
        question: "How do I balance academic research with lived experience in my approach?",
        answer:
          "The most effective learning strategists integrate both. Stay current with research on evidence-based practices while critically evaluating it through the lens of neurodivergent experiences. When research conflicts with lived experiences, explore why. Document your approaches and outcomes to contribute to the field. Join communities where neurodivergent professionals discuss and evaluate educational practices.",
      },
    ],
  },
]

// Update the topContributors object with new contributors for the new career paths
const topContributors = {
  "women-returning": [
    {
      name: "Divya Ahuja",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Career Transition Coach",
      completedSkills: 6,
      totalSkills: 6,
      path: [
        "Reflect on Goals & Direction",
        "Same Field Upgrade",
        "Update Digital Presence",
        "Rebuild Network",
        "Apply & Upskill Simultaneously",
      ],
    },
    {
      name: "Mansi Bakshi",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Tech Returnship Program Manager",
      completedSkills: 5,
      totalSkills: 6,
      path: [
        "Reflect on Goals & Direction",
        "New Career Path",
        "Update Digital Presence",
        "Rebuild Network",
        "Apply & Upskill Simultaneously",
      ],
    },
    {
      name: "Lakshmi Srinivasan",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Returnship Mentor",
      completedSkills: 5,
      totalSkills: 6,
      path: [
        "Reflect on Goals & Direction",
        "Same Field Upgrade",
        "Update Digital Presence",
        "Rebuild Network",
        "Apply & Upskill Simultaneously",
      ],
    },
  ],
  "rural-digital-freelancer": [
    {
      name: "Shubham Singhal",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Remote Web Developer",
      completedSkills: 6,
      totalSkills: 6,
      path: [
        "Assess Connectivity & Devices",
        "Skill Acquisition",
        "Build Online Presence",
        "Freelance Platforms",
        "Financial & Time Management",
      ],
    },
    {
      name: "Kusum Lata",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Digital Marketing Freelancer",
      completedSkills: 6,
      totalSkills: 6,
      path: [
        "Assess Connectivity & Devices",
        "Skill Acquisition",
        "Build Online Presence",
        "Freelance Platforms",
        "Financial & Time Management",
      ],
    },
    {
      name: "Sagar More",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Remote Software Engineer",
      completedSkills: 6,
      totalSkills: 6,
      path: [
        "Assess Connectivity & Devices",
        "Skill Acquisition",
        "Build Online Presence",
        "Remote Jobs",
        "Financial & Time Management",
      ],
    },
  ],
  "social-healthcare": [
    {
      name: "Dr. Farhana Sultana",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Global Health Consultant",
      completedSkills: 6,
      totalSkills: 6,
      path: [
        "Understand Social Determinants",
        "Skill Upgrade",
        "NGOs / Global Orgs",
        "Fieldwork / Fellowship",
        "Community Advocacy & Capacity Building",
      ],
    },
    {
      name: "Dr. Manoj Mohanan",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Health Policy Researcher",
      completedSkills: 6,
      totalSkills: 6,
      path: [
        "Understand Social Determinants",
        "Skill Upgrade",
        "Policy & Research",
        "Fieldwork / Fellowship",
        "Community Advocacy & Capacity Building",
      ],
    },
    {
      name: "Dr. Catherine Kyobutungi",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Public Health Director",
      completedSkills: 6,
      totalSkills: 6,
      path: [
        "Understand Social Determinants",
        "Skill Upgrade",
        "NGOs / Global Orgs",
        "Fieldwork / Fellowship",
        "Community Advocacy & Capacity Building",
      ],
    },
  ],
  "indie-game-developer": [
    {
      name: "Cornelia Geppert",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Indie Game Studio Founder",
      completedSkills: 7,
      totalSkills: 7,
      path: [
        "Learn the Fundamentals",
        "Build & Test Prototypes",
        "Artist/Designer",
        "Publish on Indie Platforms",
        "Grow Community & Crowdfund",
      ],
    },
    {
      name: "Rami Ismail",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Game Developer & Advocate",
      completedSkills: 7,
      totalSkills: 7,
      path: [
        "Learn the Fundamentals",
        "Build & Test Prototypes",
        "Developer/Programmer",
        "Publish on Indie Platforms",
        "Grow Community & Crowdfund",
      ],
    },
    {
      name: "Rebecca Fernández",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Narrative Game Designer",
      completedSkills: 7,
      totalSkills: 7,
      path: [
        "Learn the Fundamentals",
        "Build & Test Prototypes",
        "Writer/Narrative Designer",
        "Publish on Indie Platforms",
        "Grow Community & Crowdfund",
      ],
    },
  ],
  "neurodivergent-strategist": [
    {
      name: "Kieran Rose",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Autistic Education Consultant",
      completedSkills: 5,
      totalSkills: 5,
      path: [
        "Understand Learning Differences",
        "Study Inclusive Education Tools",
        "Create Your Own Learning Models",
        "Certify Your Skills",
        "Join Schools, NGOs or Freelance",
      ],
    },
    {
      name: "Pooky Knightsmith",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Mental Health & Education Specialist",
      completedSkills: 5,
      totalSkills: 5,
      path: [
        "Understand Learning Differences",
        "Study Inclusive Education Tools",
        "Create Your Own Learning Models",
        "Certify Your Skills",
        "Join Schools, NGOs or Freelance",
      ],
    },
    {
      name: "Jacquelyn Fede",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Neurodiversity Inclusion Researcher",
      completedSkills: 5,
      totalSkills: 5,
      path: [
        "Understand Learning Differences",
        "Study Inclusive Education Tools",
        "Create Your Own Learning Models",
        "Certify Your Skills",
        "Join Schools, NGOs or Freelance",
      ],
    },
  ],
}

// Update the careerPathFAQs object with FAQs for the new career paths
const careerPathFAQs = {
  "women-returning": [
    {
      question: "How do I explain my career gap in interviews?",
      answer:
        "Be honest but strategic. Briefly acknowledge the gap and reason, then pivot to skills gained during that time (organization, adaptability, etc.) and your enthusiasm to return. Practice your response to sound confident.",
    },
    {
      question: "Is it better to return to my previous field or change careers?",
      answer:
        "This depends on your interests, how much your field has changed, and your financial/time constraints. Returning to your previous field typically requires less retraining, while a career change offers a fresh start but may take longer to establish.",
    },
    {
      question: "What are returnships and how do I find them?",
      answer:
        "Returnships are internship-like programs specifically designed for professionals returning after a career break. Companies like Amazon, IBM, and Goldman Sachs offer them. Search for 'returnship programs' or check platforms like iRelaunch and The Mom Project.",
    },
    {
      question: "How do I update my skills after being away from the workforce?",
      answer:
        "Start with online courses on platforms like Coursera, LinkedIn Learning, or industry-specific certifications. Join professional groups to learn current trends, and consider volunteering or project work to apply these skills practically.",
    },
    {
      question: "How long will it take to successfully return to work?",
      answer:
        "The timeline varies greatly depending on your field, the length of your break, and current market conditions. Most returners find suitable roles within 3-6 months of dedicated effort, but it can take longer for career changers or highly specialized fields.",
    },
  ],
  "rural-digital-freelancer": [
    {
      question: "How can I work online with unreliable internet?",
      answer:
        "Plan around connectivity issues: download work to complete offline, use mobile data as backup, schedule uploads/meetings during reliable connection times, and communicate openly with clients about your situation. Consider weekly trips to locations with better connectivity for high-bandwidth tasks.",
    },
    {
      question: "What digital skills are most in-demand for remote work?",
      answer:
        "Currently, web development, digital marketing, content writing, graphic design, and virtual assistance are highly sought after. Data analysis, social media management, and e-commerce management are also growing fields that can be done remotely with minimal equipment.",
    },
    {
      question: "How do I price my services as a beginner?",
      answer:
        "Research market rates for your skill level and location, then start slightly lower to build reviews. Gradually increase rates as you gain experience. Consider value-based pricing for projects where your work directly generates revenue for clients. Always factor in all costs, including internet and equipment.",
    },
    {
      question: "How do I handle payments from international clients?",
      answer:
        "Popular options include PayPal, Wise (formerly TransferWise), and Payoneer. Research which platforms have the lowest fees and best exchange rates for your country. Some freelance platforms handle payments for you but charge a commission. Always clarify payment terms before starting work.",
    },
    {
      question: "How can I build trust with clients I never meet in person?",
      answer:
        "Maintain clear, prompt communication, deliver work on time, and be transparent about challenges. Use video calls when possible, provide regular updates, and ask for feedback. Building a portfolio of testimonials and reviews is crucial for establishing credibility in remote work.",
    },
  ],
  "social-healthcare": [
    {
      question: "How do I transition from clinical practice to global health?",
      answer:
        "Start by gaining relevant experience through volunteering with local community health initiatives or global health organizations. Take courses in public health, epidemiology, or global health policy. Network with professionals already in the field, and consider a Master's in Public Health (MPH) or similar qualification if possible.",
    },
    {
      question: "What skills from clinical practice transfer well to social healthcare?",
      answer:
        "Clinical assessment skills, patient communication, diagnostic reasoning, and treatment planning all transfer well. Your medical knowledge provides credibility, while your experience with patient care helps you understand health needs at an individual level. These skills need to be adapted to community contexts and resource-limited settings.",
    },
    {
      question: "Do I need additional certifications or degrees?",
      answer:
        "While not always required, a Master's in Public Health (MPH), Global Health, or related field can be valuable. Certificates in specific areas like Tropical Medicine, Humanitarian Response, or Health Systems Management can also enhance your qualifications. Many organizations value field experience equally or more than formal credentials.",
    },
    {
      question: "How can I find fieldwork opportunities?",
      answer:
        "Organizations like Doctors Without Borders, Partners in Health, and the WHO offer field positions. Look for short-term medical missions through faith-based organizations, disaster response teams, or refugee health programs. University global health departments often have connections to field opportunities for professionals.",
    },
    {
      question: "What are the biggest challenges in transitioning to social healthcare?",
      answer:
        "Common challenges include adapting to resource constraints, shifting from individual to population-based thinking, cultural and language barriers, and potentially lower compensation than clinical roles. The work can also involve difficult living conditions, separation from family, and exposure to health and safety risks. However, many find the meaningful impact and diverse experiences worth these challenges.",
    },
  ],
  "indie-game-developer": [
    {
      question: "Do I need to know how to code to make games?",
      answer:
        "Not necessarily. While coding knowledge is valuable, modern game engines like Unity and Unreal offer visual scripting options that require minimal coding. You can also focus on art, design, or narrative and collaborate with programmers. However, learning basic programming concepts will give you more creative control and independence.",
    },
    {
      question: "How much does it cost to start making indie games?",
      answer:
        "You can start with minimal investment. Free versions of Unity and Unreal Engine are available for beginners. Open-source tools like Godot, GIMP, and Blender cost nothing. Your main investment will be time for learning and development. As you progress, you might spend on assets, software subscriptions, or marketing, but many successful indies start with under $100 in tools.",
    },
    {
      question: "How long does it take to make a game?",
      answer:
        "Timeframes vary dramatically based on scope, experience, and team size. A simple game might take a few weeks, while more complex projects can take years. For beginners, it's best to start with games that can be completed in 1-3 months to build experience and avoid burnout. Game jams, which typically last 48-72 hours, are excellent practice for scope management.",
    },
    {
      question: "How do indie developers make money?",
      answer:
        "Revenue sources include direct sales on platforms like Steam or itch.io, in-app purchases, advertisements, crowdfunding (Kickstarter, Patreon), publisher advances, grants for underrepresented developers, and licensing your game or technology. Most successful indies diversify their income streams rather than relying on a single source.",
    },
    {
      question: "How can I stand out in a crowded indie market?",
      answer:
        "Develop a distinctive visual style, innovative gameplay mechanics, or compelling narrative that differentiates your game. Focus on underserved niches or bring your unique cultural perspective to your games. Build a community early by sharing your development process, and consider how your identity and experiences can inform games that tell stories others can't tell.",
    },
  ],
  "neurodivergent-strategist": [
    {
      question: "Do I need to disclose my neurodivergence professionally?",
      answer:
        "Disclosure is a personal choice. Many learning strategists find that sharing their neurodivergence adds credibility and authenticity to their work, especially when supporting neurodivergent learners. However, you can choose when, how, and to whom you disclose. Some professionals disclose their diagnosis broadly, while others share only specific traits or challenges as relevant to their work.",
    },
    {
      question: "What qualifications do I need to become a learning strategist?",
      answer:
        "Requirements vary by setting. While formal education (degrees in education, psychology, or special education) can be valuable, many organizations now recognize the importance of lived experience. Certifications in Universal Design for Learning, assistive technology, or specific learning approaches can complement your personal insights. Building a portfolio of adapted materials and testimonials from those you've helped can be equally important.",
    },
    {
      question: "How can I manage my own neurodivergent traits while supporting others?",
      answer:
        "Self-awareness and accommodations are key. Identify your strengths (hyperfocus, pattern recognition, creative thinking) and challenges (executive function, sensory sensitivities). Create systems that support your needs - this might include scheduling breaks, using organizational tools, or partnering with someone with complementary strengths. Model self-advocacy by being open about your accommodations when appropriate.",
    },
    {
      question: "Where can I find work as a neurodivergent learning strategist?",
      answer:
        "Options include schools (as specialists or consultants), educational technology companies, disability support services in higher education, workforce development programs, and independent consulting. Organizations specifically serving neurodivergent populations often value lived experience. Consider starting with freelance projects or volunteering to build your portfolio and references.",
    },
    {
      question: "How do I balance academic research with lived experience in my approach?",
      answer:
        "The most effective learning strategists integrate both. Stay current with research on evidence-based practices while critically evaluating it through the lens of neurodivergent experiences. When research conflicts with lived experiences, explore why. Document your approaches and outcomes to contribute to the field. Join communities where neurodivergent professionals discuss and evaluate educational practices.",
    },
  ],
}

export default function SkillTreePage() {
  const [activeTab, setActiveTab] = useState(skillPaths[0].id)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredPaths, setFilteredPaths] = useState(skillPaths)

  // Filter paths based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPaths(skillPaths)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = skillPaths.filter(
      (path) =>
        path.title.toLowerCase().includes(query) ||
        path.description.toLowerCase().includes(query) ||
        path.keywords.some((keyword) => keyword.toLowerCase().includes(query)),
    )

    setFilteredPaths(filtered)

    // If we have filtered results and the current active tab is not in the filtered results,
    // set the active tab to the first filtered result
    if (filtered.length > 0 && !filtered.some((path) => path.id === activeTab)) {
      setActiveTab(filtered[0].id)
    }
  }, [searchQuery, activeTab])

  const clearSearch = () => {
    setSearchQuery("")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Explore Career Paths</h1>
        <p className="text-muted-foreground">Navigate through different career paths visualized as skill trees</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search career paths, domains, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full p-0"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
        {searchQuery && (
          <p className="mt-2 text-sm text-muted-foreground">
            Found {filteredPaths.length} {filteredPaths.length === 1 ? "path" : "paths"} matching "{searchQuery}"
          </p>
        )}
      </div>

      {filteredPaths.length > 0 ? (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 flex w-full flex-wrap">
            {filteredPaths.map((path) => (
              <TabsTrigger
                key={path.id}
                value={path.id}
                className="flex-1 min-w-[120px] px-2 py-2 text-sm whitespace-normal text-center h-auto"
              >
                {path.shortTitle}
              </TabsTrigger>
            ))}
          </TabsList>

          {filteredPaths.map((path) => (
            <TabsContent key={path.id} value={path.id}>
              <Card>
                <CardHeader className="flex flex-row items-start justify-between">
                  <div>
                    <CardTitle>{path.title}</CardTitle>
                    <CardDescription>{path.description}</CardDescription>
                  </div>
                  <CareerPathRating
                    pathId={path.id}
                    initialRating={pathRatings[path.id as keyof typeof pathRatings]?.rating || 85}
                    totalVotes={pathRatings[path.id as keyof typeof pathRatings]?.votes || 0}
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <SkillPath
                    id={path.id}
                    title={path.title}
                    description={path.description}
                    skills={path.skills}
                    connections={path.connections}
                    contributors={topContributors[path.id as keyof typeof topContributors]}
                  />

                  {/* FAQ Section */}
                  {path.faqs && <CareerPathFAQ faqs={path.faqs} />}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-4 mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No matching career paths found</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            We couldn't find any career paths matching your search. Try different keywords or browse all paths.
          </p>
          <Button onClick={clearSearch}>View All Career Paths</Button>
        </div>
      )}
    </div>
  )
}

