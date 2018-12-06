#include <fstream>
#include <iostream>
#include <string>
#include <vector>

int calculateFrequency(int, std::vector<int>);
int parseInput(std::string);

int main() {
    std::string FILE_LOCATION = "..\\input.txt";
    int STARTING_FREQUENCY = 0;

    std::ifstream in;
    std::string input;
    std::vector<int> offsets;
    int value;

    in.open(FILE_LOCATION);

    while(std::getline(in, input)) {
        if(input != "") {
            value = parseInput(input);
            offsets.push_back(value);
        }
    }

    in.close();

    std::cout << calculateFrequency(STARTING_FREQUENCY, offsets);
    std::cin.get();
    return 0;
}

int calculateFrequency(int start, std::vector<int> changes) {
    int frequency = start;
    for(int i=0; i<changes.size(); i++) {
        frequency += changes[i];
    }
    return frequency;
}

int parseInput(std::string value) {
    std::string absoluteValue = value.substr(1);
    int modifier = 1;
    if(value[0] == '-') {
        modifier = -1;
    }
    int parsedValue = std::stoi(absoluteValue) * modifier;
    return parsedValue;
}
