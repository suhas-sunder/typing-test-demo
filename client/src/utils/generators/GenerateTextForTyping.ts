import GenerateRandNum from "./../generators/GenerateRandNum";
import cloudflareR2API from "../../api/cloudflareR2API";
import defaultArticle from "../../data/cat.json";

interface PropType {
  setText: (value: string) => void;
}

//Used by StartMenu.tsx to generate a block of text
export default async function GenerateTextForTyping({ setText }: PropType) {
  const allArticles = [
    {
      articleSlug: "goldfish",
      keywords: ["animal", "baby", "mammal", "cute", "furry"],
    },
    {
      articleSlug: "eagle",
      keywords: ["animal", "baby", "mammal", "cute", "furry"],
    },
    {
      articleSlug: "aligator",
      keywords: ["animal", "baby", "mammal", "cute", "furry"],
    },
    {
      articleSlug: "whale",
      keywords: ["animal", "baby", "mammal", "cute", "furry"],
    },
    {
      articleSlug: "dolphin",
      keywords: ["animal", "baby", "mammal", "cute", "furry"],
    },
    {
      articleSlug: "hen",
      keywords: ["animal", "baby", "mammal", "cute", "furry"],
    },
    {
      articleSlug: "porcupine",
      keywords: ["animal", "baby", "mammal", "cute", "furry"],
    },
    {
      articleSlug: "rabbit",
      keywords: ["animal", "baby", "mammal", "cute", "furry"],
    },
    {
      articleSlug: "heron",
      keywords: ["animal", "baby", "mammal", "cute", "furry"],
    },
    {
      articleSlug: "stork",
      keywords: ["animal", "baby", "mammal", "cute", "furry"],
    },
    {
      articleSlug: "hummingbird",
      keywords: ["animal", "baby", "mammal", "cute", "furry"],
    },
    {
      articleSlug: "robin",
      keywords: ["animal", "baby", "mammal", "cute", "furry"],
    },
    {
      articleSlug: "blue_jay",
      keywords: ["animal", "baby", "mammal", "cute", "furry"],
    },
    {
      articleSlug: "pigeon",
      keywords: ["animal", "baby", "mammal", "cute", "furry"],
    },
    {
      articleSlug: "crow",
      keywords: ["animal", "baby", "mammal", "cute", "furry"],
    },
    {
      articleSlug: "elephant",
      keywords: ["animal", "baby", "mammal", "cute", "furry"],
    },
    {
      articleSlug: "bear",
      keywords: ["animal", "baby", "mammal", "cute", "furry"],
    },
    {
      articleSlug: "panther",
      keywords: ["animal", "baby", "mammal", "cute", "furry"],
    },
    {
      articleSlug: "lion",
      keywords: ["animal", "baby", "mammal", "cute", "furry"],
    },
    {
      articleSlug: "tiger",
      keywords: ["animal", "baby", "mammal", "cute", "furry"],
    },
    {
      articleSlug: "donkey",
      keywords: ["animal", "baby", "mammal", "cute", "furry"],
    },
    {
      articleSlug: "cow",
      keywords: ["animal", "baby", "mammal", "cute", "furry"],
    },
    {
      articleSlug: "cat",
      keywords: ["animal", "baby", "mammal", "cute", "furry"],
    },
    {
      articleSlug: "kitten",
      keywords: ["animal", "baby", "mammal", "cute", "furry"],
    },
    {
      articleSlug: "horse",
      keywords: ["animal", "baby", "mammal", "cute", "furry"],
    },
    {
      articleSlug: "unicorn",
      keywords: ["animal", "baby", "mammal", "cute", "furry"],
    },
    {
      articleSlug: "diplodocus",
      keywords: ["animal", "baby", "mammal", "cute", "furry"],
    },
    {
      articleSlug: "velociraptor",
      keywords: ["animal", "baby", "mammal", "cute", "furry"],
    },
    {
      articleSlug: "triceratops",
      keywords: ["animal", "baby", "mammal", "cute", "furry"],
    },
    {
      articleSlug: "trex",
      keywords: ["animal", "baby", "mammal", "cute", "furry"],
    },
    {
      articleSlug: "velociraptor",
      keywords: ["animal", "baby", "mammal", "cute", "furry"],
    },
  ];

  const randNum = GenerateRandNum({ max: allArticles.length });

  //Format article depending on requirements
  const formatText = (article: string) => {
    setText(article.split(/\s+/).join(" "));
  };

  const handleGetText = async (slug: string) => {
    try {
      const response = await cloudflareR2API
        .get(`/typing-text%2F${slug}.json`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
        });

      const parseRes = await response;

      if (parseRes) {
        formatText(parseRes); //If article was fetched use as text
      } else {
        formatText(defaultArticle);
        console.log(
          "Failed to fetch typing text. Default text will be served.",
        );
      }
    } catch (err) {
      let message: string;

      if (err instanceof Error) {
        message = err.message;
      } else {
        message = String(err);
      }

      console.error(message);
    }
  };

  allArticles.forEach((data, index) => {
    if (index === randNum) {
      handleGetText(data.articleSlug);
    }
  });
}
