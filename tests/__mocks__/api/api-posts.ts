import { IPost, IAuthor } from "../../../src/store/modules/posts/interfaces"
export const posts: IPost[] = [
    {
        title: "A mock title 1",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porttitor posuere augue id egestas. Integer feugiat leo et mollis consequat. Nulla posuere purus id turpis porta malesuada. Donec vestibulum diam non lacus scelerisque, eu malesuada erat pharetra. Quisque bibendum neque tortor, ac maximus enim tristique a. Nullam in ultrices neque, et dapibus lectus. Nam eget interdum dui, in vulputate risus. Proin viverra elit sit amet bibendum euismod. Nam mattis mauris nec molestie tincidunt. Nam sed lectus in velit iaculis malesuada vel nec eros. Vivamus pellentesque mauris nec dolor lobortis cursus. Sed consectetur id lorem id finibus. Vestibulum accumsan diam ut maximus mollis. Maecenas ac mollis est, eget feugiat orci. Vestibulum aliquam maximus mauris tempus facilisis. Aliquam erat volutpat.",
        metadata: {
            publishedAt: 1492004832000,
            authorId: 2
        }
    },
    {
        title: "A mock title 2",
        body: "Morbi non est maximus, cursus tortor in, ullamcorper metus. Integer sagittis condimentum porta. Phasellus dolor dolor, tristique vitae ex nec, pretium dignissim diam. Duis leo nisi, eleifend at gravida eget, tincidunt non erat. Curabitur sit amet libero dolor. Pellentesque pellentesque mauris imperdiet iaculis laoreet. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
        metadata: {
            publishedAt: 1431006432000,
            authorId: 1
        }
    },
    {
        title: "A mock title 3",
        body: "Curabitur ultrices turpis tellus, lobortis varius tellus eleifend sodales. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus tincidunt massa vitae sapien laoreet, accumsan ultricies libero rutrum. Aenean nec rutrum nulla. Integer volutpat tellus et eros hendrerit, eu tristique sapien aliquam. Nulla eget turpis erat. Ut consectetur nibh sit amet mi mollis imperdiet.",
        metadata: {
            publishedAt: 1490010372000,
            authorId: 2
        }
    },
    {
        title: "A mock title 4",
        body: "Donec porta porta felis vel mattis. Vestibulum vulputate purus arcu. In feugiat euismod lorem, sit amet ultricies mi condimentum ut. Morbi ullamcorper lacus erat, sed tincidunt erat imperdiet non. Aliquam id ipsum a sapien congue hendrerit. Nulla id finibus mi. Maecenas sit amet lacus sit amet mauris faucibus dignissim. Sed sodales leo lorem, vitae ultricies mauris rhoncus gravida. Pellentesque elementum posuere ullamcorper. Fusce dui nunc, congue ac nisl ut, blandit congue purus. Mauris euismod volutpat pulvinar. Cras pellentesque nibh ut sapien sollicitudin, at posuere tortor volutpat. Integer tristique, lacus nec aliquam pellentesque, turpis quam commodo lacus, eget tincidunt lectus purus molestie tellus. Pellentesque viverra in dui quis maximus.",
        metadata: {
            publishedAt: 1470166495000,
            authorId: 3
        }
    },
    {
        title: "A mock title 5",
        body: "Sed id metus eget ex vehicula pulvinar nec ac risus. Morbi sapien erat, interdum et risus vel, porttitor vestibulum lorem. Sed id quam sed sem eleifend pretium. Fusce interdum commodo blandit. Proin est turpis, dignissim ut magna a, pulvinar volutpat elit. Nam tempor quis eros in maximus. Duis dapibus nibh vehicula bibendum pretium. Mauris nec sollicitudin mi, vitae ultrices orci. In scelerisque ultricies magna in ullamcorper. Vivamus ultricies neque libero, eu ornare justo mattis consequat. Duis pellentesque vulputate faucibus. Proin commodo, lectus ut blandit pretium, nibh ipsum sodales ipsum, id mollis urna arcu ut ante.",
        metadata: {
            publishedAt: 1516184567000,
            authorId: 4
        }
    }
]
export const authors: IAuthor[] = [
    {
        name: "testing",
        id: 1
    },
    {
        name: "Mock Author 2",
        id: 2
    },
    {
        name: "Mock Author 3",
        id: 3
    },
    {
        name: "Mock Author 4",
        id: 4
    }
]