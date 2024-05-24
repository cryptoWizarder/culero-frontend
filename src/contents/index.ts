export * from './Navbar'
import { HowProp } from '@/components/UI'

export interface IPorjectDetail {
  image: string
  title: string
  content: string
  client: string
  link: string
  tags: string[]
}
export interface IContents {
  dashboard: {
    about: {
      description: string
    }
  }
  about: {
    about: string
  }
  how: {
    how: HowProp[]
  },
  faq: {
    faq: HowProp[]
  }
  footer: {
    description: string
  }
}
export const contents: IContents = {
  dashboard: {
    about: {
      description:
        'At Culero, we believe in the power of shared experiences to shape professional journeys. Our platform is designed to foster transparency and collaboration within the professional community. Join us in building a space where career insights are accessible to all.',
    },
  },
  about: {
    about:
    'At Culero, we believe in the power of shared experiences to shape professional journeys. Our platform is designed to foster transparency and collaboration within the professional community. Join us in building a space where career insights are accessible to all.',
  },
  how: {
    how: [
      {
        title: 'Submit a Social Profile:',
        content:
          `Begin your journey on Culero by submitting the social profile link of the individual whose career you want to review. Whether it's GitHub, LinkedIn, Twitter, Instagram, or other platforms, Culero has got you covered.`,
      },
      {
        title: 'Data Analysis:',
        content:
          `Culero leverages advanced algorithms to analyze the submitted social profile. We extract key career data to provide you with a comprehensive overview, from professional achievements to project contributions.`,
      },
      {
        title: `Insightful Reviews:`,
        content:
          `Receive detailed insights about the individual's career. Understand their strengths, skills, and contributions within the professional sphere. Culero compiles a holistic review to help you make informed decisions.`,
      },
      {
        title: `Share Your Perspective:`,
        content:
          `Contribute to the Culero community by sharing your own insights and experiences. Culero is a collaborative platform, and your unique perspective adds value to the collective knowledge base.`,
      },
      {
        title: `Single Sign-On (SSO) Login:`,
        content:
          `Experience a seamless and secure login process through Single Sign-On (SSO). Currently supporting GitHub and LinkedIn, Culero ensures that your information is protected while providing easy access to the platform.`,
      },
      {
        title: `Community Engagement:`,
        content:
          `Engage with other Culero users, explore diverse career paths, and build a network of like-minded professionals. Culero fosters a community-driven approach to career exploration and review.`,
      },
    ],
  },
  faq: {
    faq: [
      {
        title: `Q: How do I review someone's career on Culero?`,
        content:
          `A: Simply enter the social profile link of the individual you want to review, and Culero will provide you with valuable career insights.`,
      },
      {
        title: 'Q: Which social platforms are supported for reviews?',
        content:
          `A: Currently, you can review professionals on GitHub, LinkedIn, Facebook, Twitter, Instagram, and more.`,
      },
      {
        title: `Q: Is my login information secure?`,
        content:
          `A: Yes, we prioritize the security of your data. Culero uses Single Sign-On (SSO) for login, currently supporting GitHub and LinkedIn.`,
      }
    ],
  },
  footer: {
    description:
      'Welcome to Culero, the platform that empowers users to review and share insights about professionals on popular social platforms. In a single word: transparency. Gain valuable career perspectives by entering the social profile links (e.g., GitHub, LinkedIn, Twitter, Instagram) of individuals you want to review.'
  },
}
