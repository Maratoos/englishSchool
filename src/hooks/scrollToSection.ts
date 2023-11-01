type TypeScrollFn = (sectionId: string) => void | undefined;

export const scrollToSection: TypeScrollFn = (sectionId) => {
    if (sectionId === "contacts") {
        window.open("https://wa.me/996500111751", "_blank");
        return;
    }
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
};