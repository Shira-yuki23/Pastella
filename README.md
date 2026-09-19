# 🌸 Pastella

**Bringing code to life — organised and dipped in color. 🌈**

<p align="center">
  <img src="./Pastella.gif" alt="Pastella theme switching demo" width="850">
</p>


Pastella is a VS Code extension that automatically changes your color theme depending on the programming language you're currently working with.

Working on Python? Give it a soft pink theme.  
Switching to C++? Maybe you want something dark.  
JavaScript? Something completely different.

With Pastella, each language can have its own visual atmosphere.

---

## ✨ Features

- 🎨 Automatically switches VS Code themes based on the active programming language
- 🌈 Assign a different theme to each language
- ⚙️ Create your own language → theme mappings
- 💾 Saves your custom mappings
- 🔄 Changes themes automatically when you switch between files
- 🧩 Works with installed VS Code color themes

---

# 🌷 How to Use Pastella

Once Pastella is installed, it automatically watches the language of the file you're currently editing.

Pastella comes with some default mappings, such as:

| Language | Theme |
|---|---|
| JavaScript | Abyss |
| Python | Huacat Pink Theme |

You can completely customize these mappings.

---

## 🎀 Customize Your Language Themes

### Step 1 — Open the Command Palette

Press:

```text
Ctrl + Shift + P
```

Then search for:

```text
Pastella
```

Select:

```text
Pastella: Language Themes
```

The Pastella configuration panel will open.

---

### Step 2 — Add a Language

Click:

```text
Add language
```

Enter the VS Code language ID and the name of the theme you want to use.

For example:

```text
cpp
Dark+ (default dark)
```

You can add as many language mappings as you want.

Example setup:

| Language ID | Theme |
|---|---|
| `python` | Huacat Pink Theme |
| `javascript` | Abyss |
| `cpp` | Dark+ (default dark) |
| `java` | Your preferred theme |

---

### Step 3 — Save

Click:

```text
Save changes
```

That's it. 🌸

Now when you switch between files, Pastella automatically switches to the theme assigned to that language.

For example:

```text
main.py
   ↓
Huacat Pink Theme 🌸

app.js
   ↓
Abyss 🌌

main.cpp
   ↓
Dark+ 🌙
```

No manual theme switching required.

---

## ⚠️ Theme Names Must Match

Pastella currently expects the **exact name of an installed VS Code color theme**.

For example, the built-in Dark+ theme is:

```text
Dark+ (default dark)
```

rather than simply:

```text
Dark+
```

If a theme doesn't switch, check that:

1. The theme is installed in VS Code.
2. The theme name is written exactly as VS Code recognizes it.
3. You used the correct VS Code language ID.

A future version of Pastella may make theme selection easier with an installed-theme picker.

---

## 💡 Finding a Language ID

Pastella uses VS Code's language identifiers.

Some common examples:

| Language | Language ID |
|---|---|
| Python | `python` |
| JavaScript | `javascript` |
| TypeScript | `typescript` |
| C | `c` |
| C++ | `cpp` |
| Java | `java` |
| C# | `csharp` |
| HTML | `html` |
| CSS | `css` |
| JSON | `json` |

---

## 🌈 Why Pastella?

Different languages can feel like different creative spaces.

Pastella lets your editor reflect that.

Instead of keeping one theme across everything you write, your workspace can change its personality along with your code.

A Python afternoon can feel completely different from a C++ midnight. 🌸

---

## 🛠️ Issues & Suggestions

Found a bug or have an idea for Pastella?

Feel free to open an issue in the GitHub repository.

---

## 📜 License

Pastella is licensed under the MIT License.

Copyright © 2026 Fariha Musfirat Shifa.

---

Made with 🌸 and an unreasonable appreciation for pretty code.
