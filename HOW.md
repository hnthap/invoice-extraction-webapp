# How to setup and run this application (development mode)

## Table of Contents

0. [Requirements](#requirements)
1. [Clone this repo](#1-clone-this-repo) (READ CAREFULLY)
2. [Set up environment and dependency](#2-set-up-environment-and-dependency)
3. [Set up AI server](#3-set-up-ai-server)
4. [Concurrently run all](#4-concurrently-run-all)

## Requirements

* git v2.13+,
* node,
* conda,

And, of course, Internet connection (to download dependencies).

On Windows, you would need to run the commands in PowerShell

## 1. Clone this repo

```bash
git clone https://github.com/hnthap/invoice_extraction_webapp/tree/main --recurse-submodules --depth 1 --branch main
cd invoice_extraction_webapp
```

## 2. Set up environment and dependency

```bash
echo 🌱 Setting up client
cd client
npm install
npm run build
echo 🌱 Setting up server
cd ../server
npm install
cd ..
```

## 3. Set up AI server

Starting at the directory of THIS FILE, run this:

```bash
cd third_party/ai_server

# Create and activate new environment
conda create -n invoiceai python=3.10.16 --yes
conda activate invoiceai

# Install gdown (latest version)
pip install gdown --upgrade

# Install vietocr from source
cd vietocr
pip install .
cd ..

# Download weights
python download.py
```

Then, install PyTorch 2.4.1 following [this instruction](https://pytorch.org/get-started/previous-versions/#v241) (using pip is recommended).

Then, run this:

```bash
pip install -r requirements.txt
cd ../..
```

## 4. Concurrently run all

Remember to activate the environment in the previous step, before running this.

```bash
npm run dev
```
